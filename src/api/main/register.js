const { getUserInfo, storeUsers } = require("@/utils/redis");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("register", `user=${username}`, `password=${password}`);
    if (!username || !password) {
      return res.status(400).json({ code: 400, msg: "请求不合法" });
    }
    const userinfo = await getUserInfo(username);
    if (userinfo?.username == username) {
      res.json({ code: 200, msg: "账号已注册" });
    } else {
      await storeUsers([{ username, password }]);
      res.json({ code: 200, msg: "ok" });
    }
  } catch (error) {
    console.error("接口错误:", error);
  }
};
module.exports = { register };
