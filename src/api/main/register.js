const { getUserInfo, storeUsers } = require("../../redis");
const { accountImport, accountCheck } = require("../../api/rest-api");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("register", `user=${username}`, `password=${password}`);
    if (!username || !password) {
      return res.status(400).json({ code: 400, msg: "请求不合法" });
    }
    const account = await accountCheck([{ UserID: username }]);
    if (!account) {
      // 注册im账号
      await accountImport({ UserID: username, Nick: "" });
    }
    const userinfo = await getUserInfo(username);
    if (userinfo?.username == username) {
      res.json({ code: 200, msg: "账号已注册" });
    } else {
      try {
        await storeUsers([{ username, password }]);
        res.json({ code: 200, msg: "ok" });
      } catch (error) {
        res.json({ code: 400, msg: "err" });
      }
    }
  } catch (error) {
    console.error("接口错误:", error);
  }
};
module.exports = { register };
