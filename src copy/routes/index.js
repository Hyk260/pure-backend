const express = require("express");
const router = express.Router();

const { isDev } = require("../config");
const { login } = require("../api/main/login");
const { register } = require("../api/main/register");
const { restApi } = require("../api/rest-api");
const market = require("../api/main/market");

// const { completions } = require("../api/chat/route");
const { authorize, callback } = require("./auth");

router.get("/test", async (req, res) => {
  res.json("test");
});

router.get("/market", market);

/* POST 登录 */
router.post("/login", login);
/* POST im rest-api */
router.post("/rest-api", restApi);
/* GET github oauth */
router.get("/auth/github", authorize);
/* GET github callback */
router.get("/auth/github/callback", callback);

if (isDev) {
  /* completions */
  // router.post("/v1/chat/completions", completions);
  /* POST 注册 */
  router.post("/register", register);
}

module.exports = router;
