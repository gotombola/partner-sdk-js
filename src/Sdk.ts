// noinspection JSUnusedGlobalSymbols

import BaseSdk from './BaseSdk';
import * as allQueries from './queries';

import {
    AuthTokenResponse,
    CreateAuthTokenInput,
    CreateRegistrationInput,
    Partner,
    RefreshAuthTokenInput,
    Registration,

    sdk_config,
    selections,
    queries,
} from "./types";

const queries: queries = allQueries as any;

export class Sdk extends BaseSdk {
    constructor(config: Omit<sdk_config, 'queries'>) {
        super({queries, ...config});
    }
    async createAuthToken(data: CreateAuthTokenInput, fields: selections = []): Promise<AuthTokenResponse> {
        return this.mutation('createAuthToken', {data}, undefined, fields);
    }
    async createRegistration(data?: CreateRegistrationInput, fields: selections = []): Promise<Registration> {
        return this.mutation('createRegistration', {data}, undefined, fields);
    }
    async me(fields: selections = []): Promise<Partner> {
        return this.query('me', undefined, undefined, fields);
    }
    async refreshAuthToken(data: RefreshAuthTokenInput, fields: selections = []): Promise<AuthTokenResponse> {
        return this.mutation('refreshAuthToken', {data}, undefined, fields);
    }
}

export default Sdk;