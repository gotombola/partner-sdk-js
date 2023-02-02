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
    nin?: string;
    phone?: string;
    requestedGameName?: string;
    requestedOrganizationName?: string;
    websiteUrl?: string;
};
export type RefreshAuthTokenInput = {
    // required
    refreshToken: string;
};
export type UpdateRegistrationInput = {
    // optional
    email?: string;
    facebookUrl?: string;
    firstName?: string;
    lastName?: string;
    nin?: string;
    phone?: string;
    requestedGameName?: string;
    requestedOrganizationName?: string;
    websiteUrl?: string;
};
