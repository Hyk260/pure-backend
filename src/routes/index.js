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
/* GET github oauth */
router.get("/auth/github", githubOauthAuthorize);
/* GET github callback */
router.get("/github/callback", githubCallback);

if (isDev) {
  /* completions */
  router.post("/v1/chat/completions", handle);
  /* POST 注册 */
  router.post("/register", register);
}

module.exports = router;
