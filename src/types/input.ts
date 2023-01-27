// noinspection JSUnusedGlobalSymbols


export type CreateAuthTokenInput = {
    // required
    password: string;
    username: string;
};
export type CreateRegistrationInput = {
    // required
    email: string;
    name: string;
    // optional
    firstName?: string;
    lastName?: string;
    phone?: string;
};
export type RefreshAuthTokenInput = {
    // required
    refreshToken: string;
};
