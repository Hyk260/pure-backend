const express = require("express");
const router = express.Router();

const { login } = require("@/api/main/login");
const { restApi } = require("@/api/rest-api");
const { getUserInfo } = require("@/utils/redis");
router.get("/test", async (req, res) => {

  res.json(123);
});
/* POST 登录 */
router.post("/login", login);
/* POST rest-api */
router.post("/rest-api", restApi);

module.exports = router;
