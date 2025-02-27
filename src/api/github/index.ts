import axios from "axios";
import { ClientType } from '../../types';
import { getGitHubSecretKey } from '../../utils/common';

const CONFIG = {
  GITHUB_API_URL: "https://api.github.com",
  GITHUB_OAUTH_URL: "https://github.com/login/oauth/access_token",
};

export default class GitHubAPI {
  // 设置Axios请求头
  private static getAuthHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }
  // 获取用户配置
  private static getUserConfig(token: string): object {
    return {
      method: "get",
      url: CONFIG.GITHUB_API_URL + '/user',
      headers: this.getAuthHeaders(token),
    };
  }
  // 获取OAuth 秘钥
  static getOAuthConfig(code: string, client: ClientType): object | null {
    const { clientId, clientSecret } = getGitHubSecretKey(client)
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
  static async getAccessToken(code: string, client: ClientType): Promise<string> {
    try {
      const config = this.getOAuthConfig(code, client);
      if (!config) return '';
      const response = await axios(config);
      return response.data.access_token || null;
    } catch (error: any) {
      console.error("Error getting access token:", error.response?.data || error);
      return '';
    }
  }
  // 获取用户信息
  static async getUser(token: string): Promise<object | null> {
    try {
      const response = await axios(this.getUserConfig(token));
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user information:", error.response?.data || error);
      return null;
    }
  }
  // 获取授权用户信息
  static async getUserInfo(code: string, client: ClientType): Promise<object | null> {
    const token = await this.getAccessToken(code, client);
    if (!token) return null;
    const user = await this.getUser(token);
    return user;
  }
}