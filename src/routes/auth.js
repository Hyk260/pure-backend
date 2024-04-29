const axios = require("axios");
const { github } = require("../config");


const getTokenUrl = "https://github.com/login/oauth/access_token";
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

function fn(code) {
  const data = {
    client_id: github.githubClientId,
    client_secret: github.githubClientSecret,
    code,
  };
  return data;
}
function githubCallback(req, res) {
  console.log(req.query);
  const { code } = req.query;
  axios
    .post(getTokenUrl, fn(code), {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      const accessToken = response.data.access_token;
      console.log("Access Token:", accessToken);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  res.json("");
}

module.exports = {
  githubOauthAuthorize,
  githubCallback,
};
