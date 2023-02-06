// noinspection JSUnusedGlobalSymbols

// first-class models

export type AuthTokenResponse = {
    // optional
    refreshToken?: string;
    token?: string;
};
export type Partner = {
    // optional
    code?: string;
    createdAt?: number;
    id?: string;
    name?: string;
    updatedAt?: number;
};
export type Registration = {
    // optional
    bannerImage?: Image;
    country?: string;
    createdAt?: number;
    email?: string;
    facebookUrl?: string;
    firstName?: string;
    game?: string;
    gameCode?: string;
    gameName?: string;
    gamePublicPageShortUrl?: string;
    gamePublicPageUrl?: string;
    id?: string;
    lastName?: string;
    locale?: string;
    logoImage?: Image;
    mainImage?: Image;
    nin?: string;
    partner?: string;
    partnerCode?: string;
    partnerName?: string;
    phone?: string;
    progressRatio?: number;
    progressStepName?: string;
    publicToken?: string;
    requestedGameDescription?: string;
    requestedGameName?: string;
    requestedOrganizationDescription?: string;
    requestedOrganizationDomain?: string;
    requestedOrganizationName?: string;
    requestedOrganizationOverline?: string;
    requestedOrganizationPresentation?: string;
    requestedThemeCode?: string;
    status?: string;
    updatedAt?: number;
    websiteUrl?: string;
};

// helper types

export type DownloadUrlInfos = {
    // optional
    downloadUrl?: string;
    fields?: string;
    fileUrl?: string;
    filename?: string;
};
export type IP = {
};
export type Image = {
    // optional
    available?: boolean;
    bucket?: string;
    cdnBucket?: string;
    cdnKey?: string;
    cdnUrl?: string;
    content?: string;
    contentAsBase64?: string;
    contentAsBase64Url?: string;
    contentType?: string;
    downloadUrl?: string;
    downloadUrlInfos?: DownloadUrlInfos;
    eTag?: string;
    fingerprint?: string;
    key?: string;
    lastModified?: string;
    name?: string;
    realContentType?: string;
    size?: number;
    uploadUrl?: string;
    uploadUrlInfos?: UploadUrlInfos;
    url?: string;
    urlInfos?: string;
    viewUrl?: string;
    viewUrlInfos?: ViewUrlInfos;
};
export type Mutation = {
    // optional
    completeRegistration?: Registration;
    createAuthToken?: AuthTokenResponse;
    createRegistration?: Registration;
    refreshAuthToken?: AuthTokenResponse;
    updateRegistration?: Registration;
};
export type Query = {
    // optional
    getRegistration?: Registration;
    me?: Partner;
};
export type Role = "partner" | "platform";
export type SemVer = {
};
export type UploadUrlInfos = {
    // optional
    fields?: string;
    fileUrl?: string;
    uploadUrl?: string;
};
export type ViewUrlInfos = {
    // optional
    fields?: string;
    fileUrl?: string;
    filename?: string;
    viewUrl?: string;
};
export type __Directive = {
    // required
    args: __InputValue[];
    isRepeatable: boolean;
    locations: __DirectiveLocation[];
    name: string;
    // optional
    description?: string;
};
export type __DirectiveLocation = "QUERY" | "MUTATION" | "SUBSCRIPTION" | "FIELD" | "FRAGMENT_DEFINITION" | "FRAGMENT_SPREAD" | "INLINE_FRAGMENT" | "VARIABLE_DEFINITION" | "SCHEMA" | "SCALAR" | "OBJECT" | "FIELD_DEFINITION" | "ARGUMENT_DEFINITION" | "INTERFACE" | "UNION" | "ENUM" | "ENUM_VALUE" | "INPUT_OBJECT" | "INPUT_FIELD_DEFINITION";
export type __EnumValue = {
    // required
    isDeprecated: boolean;
    name: string;
    // optional
    deprecationReason?: string;
    description?: string;
};
export type __Field = {
    // required
    args: __InputValue[];
    isDeprecated: boolean;
    name: string;
    type: __Type;
    // optional
    deprecationReason?: string;
    description?: string;
};
export type __InputValue = {
    // required
    isDeprecated: boolean;
    name: string;
    type: __Type;
    // optional
    defaultValue?: string;
    deprecationReason?: string;
    description?: string;
};
export type __Schema = {
    // required
    directives: __Directive[];
    queryType: __Type;
    types: __Type[];
    // optional
    description?: string;
    mutationType?: __Type;
    subscriptionType?: __Type;
};
export type __Type = {
    // required
    enumValues: __EnumValue[];
    fields: __Field[];
    inputFields: __InputValue[];
    interfaces: __Type[];
    kind: __TypeKind;
    possibleTypes: __Type[];
    // optional
    description?: string;
    name?: string;
    ofType?: __Type;
    specifiedByURL?: string;
};
export type __TypeKind = "SCALAR" | "OBJECT" | "INTERFACE" | "UNION" | "ENUM" | "INPUT_OBJECT" | "LIST" | "NON_NULL";
