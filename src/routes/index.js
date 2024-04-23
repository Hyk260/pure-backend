const express = require("express");
const router = express.Router();

const { login } = require("../api/main/login");
const { register } = require("../api/main/register");
const { restApi } = require("../api/rest-api");
const { handle } = require("../api/chat/route");

router.get("/test", async (req, res) => {
  res.json("test");
});
/* POST 登录 */
router.post("/openai", handle);
/* POST 登录 */
router.post("/login", login);
/* POST 注册 */
router.post("/register", register);
/* POST im rest-api */
router.post("/rest-api", restApi);

module.exports = router;
