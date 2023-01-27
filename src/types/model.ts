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
    createdAt?: number;
    email?: string;
    facebookUrl?: string;
    firstName?: string;
    id?: string;
    lastName?: string;
    partner?: string;
    partnerCode?: string;
    partnerName?: string;
    phone?: string;
    publicToken?: string;
    status?: string;
    updatedAt?: number;
    websiteUrl?: string;
};

// helper types

export type IP = {
};
export type Mutation = {
    // optional
    createAuthToken?: AuthTokenResponse;
    createRegistration?: Registration;
    refreshAuthToken?: AuthTokenResponse;
};
export type Query = {
    // optional
    me?: Partner;
};
export type Role = "partner" | "platform";
export type SemVer = {
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
