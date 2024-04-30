const { github } = require("../config");
const { getUserInfo } = require("../api/github");
const { registerAccount } = require("../api/main/register");
const { handleLoginSuccess } = require("../api/main/login");

// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
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

async function githubCallback(req, res) {
  const { code } = req.query;
  const userInfo = await getUserInfo(code);
  if (userInfo) {
    // avatar_url id login
    const { avatar_url, id, login } = userInfo;
    console.log(avatar_url, id, login);
    await registerAccount({ user: id.toString(), nick: login, avatar: avatar_url });
    handleLoginSuccess(res, { username: id.toString() });
  } else {
    res.json("授权失败");
  }
}

module.exports = {
  githubOauthAuthorize,
  githubCallback,
};
