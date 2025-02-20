"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const common_1 = require("../../utils/common");
const CONFIG = {
    GITHUB_API_URL: "https://api.github.com",
    GITHUB_OAUTH_URL: "https://github.com/login/oauth/access_token",
};
class GitHubAPI {
    // 设置Axios请求头
    static getAuthHeaders(token) {
        const headers = {
            Accept: "application/json",
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return headers;
    }
    // 获取用户配置
    static getUserConfig(token) {
        return {
            method: "get",
            url: CONFIG.GITHUB_API_URL + '/user',
            headers: this.getAuthHeaders(token),
        };
    }
    // 获取OAuth 秘钥
    static getOAuthConfig(code, client) {
        const { clientId, clientSecret } = (0, common_1.getGitHubSecretKey)(client);
        if (!clientId || !clientSecret) {
            console.error(`GitHub客户端配置无效: ${client}`);
            return null;
        }
        return {
            method: "post",
            headers: this.getAuthHeaders(),
            url: CONFIG.GITHUB_OAUTH_URL,
            data: {
                code,
                client_id: clientId,
                client_secret: clientSecret,
            },
        };
    }
    // 获取访问令牌
    static async getAccessToken(code, client) {
        try {
            const config = this.getOAuthConfig(code, client);
            if (!config)
                return '';
            const response = await (0, axios_1.default)(config);
            return response.data.access_token || null;
        }
        catch (error) {
            console.error("Error getting access token:", error.response?.data || error);
            return '';
        }
    }
    // 获取用户信息
    static async getUser(token) {
        try {
            const response = await (0, axios_1.default)(this.getUserConfig(token));
            return response.data;
        }
        catch (error) {
            console.error("Error fetching user information:", error.response?.data || error);
            return null;
        }
    }
    // 获取授权用户信息
    static async getUserInfo(code, client) {
        const token = await this.getAccessToken(code, client);
        if (!token)
            return null;
        const user = await this.getUser(token);
        return user;
    }
}
exports.default = GitHubAPI;
