const GitHubAPI = require("../api/github");
const { registerAccount } = require("../api/main/register");
const { getGitHubSecretKey } = require('../utils/common')
const { handleLoginSuccess } = require("../api/main/login");

function authorize(req, res) {
  const { client } = req.query
  const { clientId } = getGitHubSecretKey(client)

  const query = new URLSearchParams({
    client_id: clientId,
    // scope: '',
    // allow_signup: 'true',
  });

  const url = `https://github.com/login/oauth/authorize?${query.toString()}`;
  res.json({ url });
}

async function callback(req, res) {
  const { code, client } = req.query;

  try {
    const userInfo = await GitHubAPI.getUserInfo(code, client);
    if (!userInfo) {
      return res.status(400).json({ error: "授权失败" });
    }

    const { avatar_url, id, login } = userInfo;
    console.log(avatar_url, id, login);

    await registerAccount({ user: id.toString(), nick: login, avatar: avatar_url });
    handleLoginSuccess(res, { username: id.toString() });
  } catch (error) {
    console.error("Error during GitHub OAuth callback:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
}

module.exports = {
  githubOauthAuthorize: authorize,
  githubCallback: callback,
};
