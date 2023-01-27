// noinspection JSUnusedGlobalSymbols

// -- QUERIES -----------------------

export const getRegistration = [
    `query($id: ID!) { getRegistration(id: $id) { @selections@ } }`,
    ["createdAt","email","facebookUrl","firstName","id","lastName","partner","partnerCode","partnerName","phone","publicToken","status","updatedAt","websiteUrl"],
];
export const me = [
    `query { me { @selections@ } }`,
    ["code","createdAt","id","name","updatedAt"],
];
// -- MUTATIONS ---------------------

export const createAuthToken = [
    `mutation($data: CreateAuthTokenInput!) { createAuthToken(data: $data) { @selections@ } }`,
    ["refreshToken","token"],
];
export const createRegistration = [
    `mutation($data: CreateRegistrationInput) { createRegistration(data: $data) { @selections@ } }`,
    ["createdAt","email","facebookUrl","firstName","id","lastName","partner","partnerCode","partnerName","phone","publicToken","status","updatedAt","websiteUrl"],
];
export const refreshAuthToken = [
    `mutation($data: RefreshAuthTokenInput!) { refreshAuthToken(data: $data) { @selections@ } }`,
    ["refreshToken","token"],
];
