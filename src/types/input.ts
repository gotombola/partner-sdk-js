// noinspection JSUnusedGlobalSymbols


export type CreateAuthTokenInput = {
    // required
    password: string;
    username: string;
};
export type CreateRegistrationInput = {
    // optional
    bannerImage?: ImageInput;
    country?: string;
    email?: string;
    facebookUrl?: string;
    firstName?: string;
    lastName?: string;
    locale?: string;
    logoImage?: ImageInput;
    mainImage?: ImageInput;
    nin?: string;
    phone?: string;
    requestedGameDescription?: string;
    requestedGameName?: string;
    requestedOrganizationDescription?: string;
    requestedOrganizationDomain?: string;
    requestedOrganizationName?: string;
    requestedOrganizationOverline?: string;
    requestedOrganizationPresentation?: string;
    requestedThemeCode?: string;
    websiteUrl?: string;
};
export type ImageInput = {
    // optional
    bucket?: string;
    content?: string;
    contentType?: string;
    key?: string;
    name?: string;
    url?: string;
};
export type RefreshAuthTokenInput = {
    // required
    refreshToken: string;
};
export type UpdateRegistrationInput = {
    // optional
    bannerImage?: ImageInput;
    country?: string;
    email?: string;
    facebookUrl?: string;
    firstName?: string;
    lastName?: string;
    locale?: string;
    logoImage?: ImageInput;
    mainImage?: ImageInput;
    nin?: string;
    phone?: string;
    requestedGameDescription?: string;
    requestedGameName?: string;
    requestedOrganizationDescription?: string;
    requestedOrganizationDomain?: string;
    requestedOrganizationName?: string;
    requestedOrganizationOverline?: string;
    requestedOrganizationPresentation?: string;
    requestedThemeCode?: string;
    websiteUrl?: string;
};
