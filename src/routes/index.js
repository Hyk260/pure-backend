const express = require("express");
const router = express.Router();

const { isDev } = require("../config");
const { login } = require("../api/main/login");
const { register } = require("../api/main/register");
const { restApi } = require("../api/rest-api");
const { handle } = require("../api/chat/route");
const { githubOauthAuthorize, githubCallback } = require("./auth");

router.get("/test", async (req, res) => {
  res.json("test");
});
/* POST 登录 */
router.post("/login", login);
/* POST im rest-api */
router.post("/rest-api", restApi);

if (isDev) {
  router.get("/auth/github", githubOauthAuthorize);
  router.get("/github/callback", githubCallback);
  /* completions */
  router.post("/v1/chat/completions", handle);
  /* POST 注册 */
  router.post("/register", register);
}

module.exports = router;
