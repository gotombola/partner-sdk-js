import {Sdk} from './Sdk';
import {fetch, sdk_identity} from './types';
import {envs, defaultEnv} from './config';

export * from './Sdk';
export {default as default} from './Sdk';

export const createSdk = (restEndpoint: string, graphqlEndpoint: string, fetch: fetch, identity?: sdk_identity) =>
    new Sdk({endpoints: {rest: restEndpoint, graphql: graphqlEndpoint}, fetch, identity})
;

export function createEnvSdk(env: string|undefined = undefined, localFetch: fetch|undefined = undefined, username?: string, password?: string) {
    let globalFetch = require('cross-fetch');
    const fetch = localFetch || globalFetch;
    if (!fetch) throw new Error(`No fetch function available`);
    env = env || process.env.PARTNER_SDK_ENV || defaultEnv;
    username = username || process.env.PARTNER_SDK_USERNAME || undefined;
    password = password || process.env.PARTNER_SDK_PASSWORD || undefined;

    let {rest, graphql} = envs[env || ''] || envs[defaultEnv];

    rest = (rest || '').replace('{{source}}', env);
    graphql = (graphql || '').replace('{{source}}', env);

    return createSdk(rest, graphql, fetch as any, (username && password) ? {username, password} : undefined);
}

