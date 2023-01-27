// noinspection JSUnusedGlobalSymbols

import {fetch, queries, selection, selections, variables, sdk_identity, sdk_auth_tokens, non_empty_sdk_auth_tokens, sdk_options, sdk_config, auth_data} from './types';
import decodeJwt from 'jwt-decode';
import debug from 'debug';

const debugSdk = debug('partner-sdk');
const debugSdkIdentity = debug('partner-sdk:identity');
const debugSdkTokens = debug('partner-sdk:tokens');
const debugSdkHttp = debug('partner-sdk:http');
const debugSdkGraphqlQuery = debug('partner-sdk:gql:query');
const debugSdkGraphqlMutation = debug('partner-sdk:gql:mutation');

const defaultOptions: sdk_options = {
    minExpirationDelay: 2,
};

export abstract class BaseSdk {
    private readonly endpoints: {rest: string, graphql: string};
    private readonly fetch: fetch;
    private identity: sdk_identity;
    private tokens: sdk_auth_tokens;
    private readonly queries: queries;
    private readonly options: sdk_options;
    protected constructor({endpoints, fetch, identity, queries, options = {}}: sdk_config) {
        this.endpoints = endpoints;
        this.fetch = fetch;
        this.queries = queries;
        this.options = {...defaultOptions, ...options} as sdk_options;
        this.setIdentity(identity);
        debugSdk('instantiate %j', this);
    }
    public setIdentity(identity: sdk_identity) {
        this.identity = !!identity ? {username: identity.username, password: identity.password} : undefined;
        if (!this.identity) this.cleanAuthTokens();
        debugSdkIdentity('identity %j', this.identity);
        return this;
    }
    async getAuthData(): Promise<auth_data|undefined> {
        await this.prepareAuthTokens();
        return this.tokens?.accessToken ? this.decodeToken(this.tokens!.accessToken) : undefined;
    }
    protected getIdentity(): sdk_identity {
        return this.identity;
    }
    protected isIdentitifed(): boolean {
        return !!this.identity && !!this.identity!.username;
    }
    protected async prepareAuthTokens() {
        if (!this.isIdentitifed()) return;
        if (this.isAccessTokenValid()) return;
        return this.refreshAccessToken();
    }
    protected isAccessTokenValid() {
        if (!this.tokens?.accessToken) return false;
        return !this.isTokenExpired(this.tokens!.accessToken);
    }
    protected async refreshAccessToken() {
        debugSdkTokens('refresh');
        if (this.isTokenExpired(this.tokens?.refreshToken)) return this.setTokens(await this.createAuthTokensFromIdentity(this.getIdentity()));
        return this.setTokens(await this.createAuthTokensFromRefreshToken(this.tokens!.refreshToken));
    }
    protected isTokenExpired(token: string|undefined) {
        if (!token) return true;
        const decodedToken = this.decodeToken(token);
        const now = Math.floor(Date.now() / 1000);
        return ((decodedToken || {}).exp - now) < ((this.options.minExpirationDelay as number) || 1);
    }
    protected decodeToken(token: string): auth_data {
        const x = decodeJwt(token);
        debugSdkTokens('decoded %j (from %s)', x, token);
        return x as auth_data;
    }
    protected setTokens(tokens: non_empty_sdk_auth_tokens) {
        debugSdkTokens('tokens %j', tokens)
        this.tokens = tokens;
        return this;
    }
    protected async createAuthTokensFromIdentity(identity: sdk_identity) {
        if (!identity) throw new Error(`Empty identity, please set identity first`);
        const {token, refreshToken} = await this.rawMutation('createAuthToken', {data: {username: identity.username, password: identity.password}});
        return {accessToken: token, refreshToken};
    }
    protected async createAuthTokensFromRefreshToken(refreshToken: string|undefined) {
        if (!refreshToken) throw new Error(`Empty refresh token, please reset tokens`);
        const {token, refreshToken: newRefreshToken} = await this.rawMutation('refreshAuthToken', {data: {refreshToken}});
        return {accessToken: token, refreshToken: newRefreshToken};
    }
    protected cleanAuthTokens() {
        this.tokens = undefined;
        debugSdkTokens('cleaned');
        return this;
    }
    protected async request(service, method: string, uri: string|undefined = undefined, body: any|undefined = undefined, headers: any|undefined = undefined, allowedStatusCodes: number[]|undefined = undefined) {
        await this.prepareAuthTokens();
        return this.http(service, method, uri, body, {...(headers ? headers : {}), ...(this.tokens?.accessToken ? {Authorization: `bearer ${this.tokens!.accessToken}`} : {})}, allowedStatusCodes);
    }
    protected isAllowedStatusCodes(status, expected: number[]) {
        return expected.includes(status);
    }
    protected async http(service, method: string, uri: string|undefined = undefined, body: any|undefined = undefined, headers: any|undefined = undefined, allowedStatusCodes: number[]|undefined = undefined) {
        debugSdkHttp('fetch > service: %s, method: %s, uri: %s, body: %j, headers: %j, allowedStatusCode: %j', service, method, uri, body, headers, allowedStatusCodes);
        const res = await this.fetch(`${this.endpoints[service]}${uri || ''}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'gotombola-partner-sdk-ts/1.0',
                ...(headers || {})
            },
            body: body && JSON.stringify(body)
        });
        if (!!allowedStatusCodes && !!allowedStatusCodes.length && !this.isAllowedStatusCodes(res.status, allowedStatusCodes)) {
            let details: any = undefined;
            try {
                details = JSON.stringify(await res.json());
            } catch (e: any) {
                try {
                    details = `content is not valid json: ${await res.text()}`;
                } catch (e2: any) {
                    details = 'content is not valid json (unable to fetch content as text)';
                }
            }
            debugSdkHttp('response code unauthorized %d, content: %j', res.status, details);
            throw new Error(`${service} API responded with an unauthorized status code (expected: ${JSON.stringify(allowedStatusCodes)}, actual: ${res.status}) and content: ${details}`);
        }

        const r = await res.json();
        debugSdkHttp('result %j', r);
        return r;
    }
    protected async graphqlQuery(query: string, variables: any = {}, headers: any|undefined = undefined, allowedStatusCodes: number[]|undefined = [200]) {
        debugSdkGraphqlQuery('request %s %j', query, variables);
        const r = await this.request('graphql', 'post', undefined, {query, variables}, headers, allowedStatusCodes);
        debugSdkGraphqlQuery('result %j', r);
        return r;
    }
    protected async rawGraphqlQuery(query: string, variables: any = {}, headers: any|undefined = undefined, allowedStatusCodes: number[]|undefined = [200]) {
        debugSdkGraphqlQuery('raw request %s %j', query, variables);
        const r = await this.http('graphql', 'post', undefined, {query, variables}, headers, allowedStatusCodes);
        debugSdkGraphqlQuery('result %j', r);
        return r;
    }
    protected async graphqlMutation(mutation: string, variables: any = {}, headers: any|undefined = undefined, allowedStatusCodes: number[]|undefined = [200]) {
        debugSdkGraphqlMutation('request %s %j', mutation, variables);
        const r = await this.request('graphql', 'post', undefined, {query: mutation, variables}, headers, allowedStatusCodes);
        debugSdkGraphqlMutation('result %j', r);
        return r;
    }
    protected async rawGraphqlMutation(mutation: string, variables: any = {}, headers: any|undefined = undefined, allowedStatusCodes: number[]|undefined = [200]) {
        debugSdkGraphqlMutation('raw request %s %j', mutation, variables);
        const r = await this.http('graphql', 'post', undefined, {query: mutation, variables}, headers, allowedStatusCodes);
        debugSdkGraphqlMutation('result %j', r);
        return r;
    }
    protected async restGet(uri: string) {
        return this.request('rest', 'get', uri);
    }
    protected async restPost(uri: string, data: any = {}) {
        return this.request('rest', 'post', uri, data);
    }
    protected async restUpdate(uri: string, data: any = {}) {
        return this.request('rest', 'put', uri, data);
    }
    protected async restDelete(uri: string) {
        return this.request('rest', 'delete', uri);
    }
    protected async restOptions(uri: string) {
        return this.request('rest', 'options', uri);
    }
    protected async restHead(uri: string) {
        return this.request('rest', 'head', uri);
    }
    protected gqlResult(r: any, key: string) {
        if (r?.errors?.length) throw new Error(r.errors[0].message);

        return (r?.data || {})[key];
    }
    protected async mutation(queryKey: string, variables?: variables, dataKey?: string, selections?: selections) {
        return this.gqlResult(await this.graphqlMutation(this.buildQuery(this.queries, queryKey, selections), variables), dataKey || queryKey);
    }
    protected async rawMutation(queryKey: string, variables?: variables, dataKey?: string, selections?: selections) {
        return this.gqlResult(await this.rawGraphqlMutation(this.buildQuery(this.queries, queryKey, selections), variables), dataKey || queryKey);
    }
    protected async queryAll(queryKey: string, variables?: variables, dataKey?: string, selections?: selections) {
        const fetcher = async (offset: string|undefined) => this.query(queryKey, {...(variables || {}), offset}, dataKey, selections);
        const processor = async (page: {cursor?: string, count: number, items: any[]}, ctx) => {
            ctx.items = [...(ctx.items || []), ...page.items];
        }
        return (await this.processAllPages(fetcher, processor)).items || [];
    }
    protected async query(queryKey: string, variables?: variables, dataKey?: string, selections?: selections) {
        return this.gqlResult(await this.graphqlQuery(this.buildQuery(this.queries, queryKey, selections), variables), dataKey || queryKey);
    }
    protected async rawQuery(queryKey: string, variables?: variables, dataKey?: string, selections?: selections) {
        return this.gqlResult(await this.rawGraphqlQuery(this.buildQuery(this.queries, queryKey, selections), variables), dataKey || queryKey);
    }
    protected buildQuery(queries: queries, queryKey: string, selections?: selections) {
        const q = queries[queryKey];
        if (!q) throw new Error(`Unknown query '${queryKey}', did you create it in the queries config file?`);
        if ('string' === typeof q) return q;
        let [query, defaultSelections = undefined]: [string, undefined|selections] = q;
        return this.buildFinalQuery(query, this.buildFinalSelections(selections, defaultSelections));
    }
    protected buildFinalSelections(selections?: selections, defaultSelections?: selections) {
        return ((!!selections && !!selections.length) ? (selections.includes('@') ? [...(defaultSelections || []), ...selections] : selections) : (defaultSelections || [])).filter(x => '@' !== x);
    }
    protected buildFinalQuery(query: string, selections: selections) {
        return query.replace('@selections@', this.buildSelections(selections) || '__typename')
    }
    protected buildSelections(selections: selections) {
        return selections.map((selection: selection) => {
            if ('string' === typeof selection) return selection;
            const [s1, s2] = selection;
            return `${s1} { ${this.buildSelections(s2 || [] as selections)} }`;
        }).join(' ');
    }
    private async processAllPages(fetcher: Function, processor: Function): Promise<any> {
        let cursor = undefined;
        const ctx = {};
        do {
            const page = await fetcher(cursor);
            await processor(page, ctx)
            cursor = page.cursor;
        } while (!!cursor);
        return ctx;
    }
}

export default BaseSdk;