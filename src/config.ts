export const envs = {
    "local": {
        "graphql": "http://localhost:4000"
    },
    "default": {
        "graphql": "https://partner.api.{{source}}.gotombola.co"
    },
    "prod": {
        "graphql": "https://partner.api.gotombola.co"
    }
};

export const defaultEnv = "default";