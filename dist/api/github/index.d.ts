export type ClientType = "web" | "app";
export type UserInfoType = {
    id: number;
    login: string;
    avatar_url: string;
};
export default class GitHubAPI {
    private static getAuthHeaders;
    private static getUserConfig;
    static getOAuthConfig(code: string, client: ClientType): object | null;
    static getAccessToken(code: string, client: ClientType): Promise<string>;
    static getUser(token: string): Promise<object | null>;
    static getUserInfo(code: string, client: ClientType): Promise<object | null>;
}
