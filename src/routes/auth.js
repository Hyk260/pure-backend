const axios = require("axios");
const { github } = require("../config");

// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
const getTokenUrl = "https://github.com/login/oauth/access_token";
const getUserurl = "https://api.github.com/user";
function githubOauthAuthorize(req, res) {
  const query = new URLSearchParams({
    client_id: github.githubClientId,
    // scope: '',
    // allow_signup: 'true',
    // ...req.query,
  });
  const url = `https://github.com/login/oauth/authorize?${query.toString()}`;
  res.json(url);
}
function config(token) {
  return {
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
}
function fn(code) {
  const data = {
    client_id: github.githubClientId,
    client_secret: github.githubClientSecret,
    code,
  };
  return data;
}
async function getAccessToken(code) {
  try {
    const response = await axios.post(getTokenUrl, fn(code), {
      headers: {
        Accept: "application/json",
      },
    });
    const accessToken = response.data.access_token;
    console.log("Access Token:", accessToken);
    return accessToken;
  } catch (error) {
    return "";
  }
}
// 用于获取授权用户信息的函数
async function getUserInfo(code) {
  const token = await getAccessToken(code);
  if (!token) return;
  console.log(`Basic ${token}`);
  // axios(config(token))
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  var config = {
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://www.apifox.cn)",
      Authorization:
        `Basic ${token}`,
      Accept: "*/*",
      Host: "api.github.com",
      Connection: "keep-alive",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return JSON.stringify(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function githubCallback(req, res) {
  console.log(req.query);
  const { code } = req.query;
  const userInfo = await getUserInfo(code);
  console.log(userInfo);
  res.json(userInfo);
}

// axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

module.exports = {
  githubOauthAuthorize,
  githubCallback,
};
