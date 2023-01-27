// noinspection JSUnusedGlobalSymbols


export type CreateAuthTokenInput = {
    // required
    password: string;
    username: string;
};
export type CreateRegistrationInput = {
    // optional
    email?: string;
    facebookUrl?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    phone?: string;
    websiteUrl?: string;
};
export type RefreshAuthTokenInput = {
    // required
    refreshToken: string;
};
