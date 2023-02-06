// noinspection JSUnusedGlobalSymbols

// -- QUERIES -----------------------

export const getRegistration = [
    `query($id: ID!) { getRegistration(id: $id) { @selections@ } }`,
    ["country","createdAt","email","facebookUrl","firstName","game","gameCode","gameName","gamePublicPageShortUrl","gamePublicPageUrl","id","lastName","locale","nin","partner","partnerCode","partnerName","phone","progressRatio","progressStepName","publicToken","requestedGameDescription","requestedGameName","requestedOrganizationDescription","requestedOrganizationDomain","requestedOrganizationName","requestedOrganizationOverline","requestedOrganizationPresentation","requestedThemeCode","status","updatedAt","websiteUrl"],
];
export const me = [
    `query { me { @selections@ } }`,
    ["code","createdAt","id","name","updatedAt"],
];
// -- MUTATIONS ---------------------

export const completeRegistration = [
    `mutation($id: ID!) { completeRegistration(id: $id) { @selections@ } }`,
    ["country","createdAt","email","facebookUrl","firstName","game","gameCode","gameName","gamePublicPageShortUrl","gamePublicPageUrl","id","lastName","locale","nin","partner","partnerCode","partnerName","phone","progressRatio","progressStepName","publicToken","requestedGameDescription","requestedGameName","requestedOrganizationDescription","requestedOrganizationDomain","requestedOrganizationName","requestedOrganizationOverline","requestedOrganizationPresentation","requestedThemeCode","status","updatedAt","websiteUrl"],
];
export const createAuthToken = [
    `mutation($data: CreateAuthTokenInput!) { createAuthToken(data: $data) { @selections@ } }`,
    ["refreshToken","token"],
];
export const createRegistration = [
    `mutation($data: CreateRegistrationInput) { createRegistration(data: $data) { @selections@ } }`,
    ["country","createdAt","email","facebookUrl","firstName","game","gameCode","gameName","gamePublicPageShortUrl","gamePublicPageUrl","id","lastName","locale","nin","partner","partnerCode","partnerName","phone","progressRatio","progressStepName","publicToken","requestedGameDescription","requestedGameName","requestedOrganizationDescription","requestedOrganizationDomain","requestedOrganizationName","requestedOrganizationOverline","requestedOrganizationPresentation","requestedThemeCode","status","updatedAt","websiteUrl"],
];
export const refreshAuthToken = [
    `mutation($data: RefreshAuthTokenInput!) { refreshAuthToken(data: $data) { @selections@ } }`,
    ["refreshToken","token"],
];
export const updateRegistration = [
    `mutation($id: ID!, $data: UpdateRegistrationInput) { updateRegistration(id: $id, data: $data) { @selections@ } }`,
    ["country","createdAt","email","facebookUrl","firstName","game","gameCode","gameName","gamePublicPageShortUrl","gamePublicPageUrl","id","lastName","locale","nin","partner","partnerCode","partnerName","phone","progressRatio","progressStepName","publicToken","requestedGameDescription","requestedGameName","requestedOrganizationDescription","requestedOrganizationDomain","requestedOrganizationName","requestedOrganizationOverline","requestedOrganizationPresentation","requestedThemeCode","status","updatedAt","websiteUrl"],
];
