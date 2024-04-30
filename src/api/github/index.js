const axios = require("axios");
const { github } = require("../../config");

function userConfig(token) {
  return {
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function oauthConfig(code) {
  return {
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id: github.githubClientId,
      client_secret: github.githubClientSecret,
      code,
    },
    headers: {
      Accept: "application/json",
    },
  };
}

async function getAccessToken(code) {
  try {
    const response = await axios(oauthConfig(code));
    const accessToken = response.data.access_token;
    console.log("accessToken:", accessToken);
    return accessToken;
  } catch (error) {
    console.log("error accessToken:", error);
    return "";
  }
}

async function getUser(token) {
  try {
    const response = await axios(userConfig(token));
    const user = response.data;
    console.log("user:", user);
    return user;
  } catch (error) {
    console.log("error user:", error);
    return "";
  }
}

// 用于获取授权用户信息的函数
async function getUserInfo(code) {
  const token = await getAccessToken(code);
  if (!token) return;
  const user = await getUser(token);
  return user;
}

module.exports = {
  getUserInfo,
};
