const axios = require("axios");
const { getGitHubSecretKey } = require('../../utils/common')

class GitHubAPI {
  /**
   * 获取用户配置
   * @param {string} token - GitHub访问令牌
   * @returns {object} Axios配置对象
   */
  static userConfig(token) {
    return {
      method: "get",
      url: "https://api.github.com/user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  /**
   * 获取OAuth配置
   * @param {string} code - GitHub授权码
   * @returns {object} Axios配置对象
   */
  static oauthConfig(code, client) {
    const { clientId, clientSecret } = getGitHubSecretKey(client)
    return {
      method: "post",
      url: "https://github.com/login/oauth/access_token",
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    };
  }

  /**
   * 获取访问令牌
   * @param {string} code - GitHub授权码
   * @returns {Promise<string>} 访问令牌
   */
  static async getAccessToken(code, client) {
    try {
      const response = await axios(this.oauthConfig(code, client));
      const accessToken = response.data.access_token;
      console.log("accessToken:", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Error retrieving access token:", error);
      return null; // 返回null而不是空字符串，便于后续检查
    }
  }

  /**
   * 获取用户信息
   * @param {string} token - GitHub访问令牌
   * @returns {Promise<object|null>} 用户信息
   */
  static async getUser(token) {
    try {
      const response = await axios(this.userConfig(token));
      const user = response.data;
      console.log("user:", user);
      return user;
    } catch (error) {
      console.error("Error retrieving user info:", error);
      return null; // 返回null而不是空字符串，便于后续检查
    }
  }

  /**
   * 获取授权用户信息
   * @param {string} code - GitHub授权码
   * @returns {Promise<object|null>} 用户信息
   */
  static async getUserInfo(code, client) {
    const token = await this.getAccessToken(code, client);
    if (!token) return null; // 如果没有获取到token，返回null
    const user = await this.getUser(token);
    return user;
  }
}

module.exports = GitHubAPI;