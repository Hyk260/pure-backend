declare const _default: {
    port: string;
    host: string | undefined;
    nodeEnv: "development" | "production";
    isDev: boolean;
    jwtSecret: string;
    expireTime: number;
    jwtAlgorithm: string;
    administrator: string;
    imAppId: string;
    imAppKey: string;
    imServerBaseUrl: string;
    bucket: string;
    region: string;
    secretId: string | undefined;
    secretKey: string | undefined;
    openaiApiKey: string | undefined;
    options: {
        dataBaseMode: string;
    };
    github: {
        clientId: string;
        clientSecret: string;
        clientIdApp: string;
        clientSecretApp: string;
    };
    logs: {
        level: string;
    };
    redis: {
        port: string | number;
        host: string;
        charset: string;
        username: string;
        password: string;
    };
    api: {
        prefix: string;
    };
    authOrity: string[];
};
export default _default;
