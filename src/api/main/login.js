const jwt = require("jsonwebtoken");
const generateSig = require("@/utils/generateSig");
const { getUsername } = require("@/utils/redis");
const { jwtSecret, expireTime } = require("@/config");

// 生成 jwt token 的函数
function generateToken(user) {
  return jwt.sign(user, jwtSecret, { expiresIn: expireTime });
}
// 用户认证函数
async function authenticateUser(username, password) {
  const userData = await getUsername(username);
  if (userData && userData?.password === password) {
    return userData;
  } else {
    return false;
  }
}
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("login", `user=${username}`, `password=${password}`);
    if (!username || !password) {
      return res.status(400).json({ code: 400, msg: "请求不合法" });
    }
    const user = await authenticateUser(username, password);
    if (user) {
      const token = generateToken(user);
      res.setHeader("Access-Control-Expose-Headers", "x-token");
      // 注意默认情况 Token 必须以 Bearer+空格 开头
      res.setHeader("X-token", `Bearer ${token}`);
      user.userSig = generateSig({ identifier: username });
      res.json({ code: 200, msg: "登录成功", result: user });
    } else {
      res.json({ code: 401, msg: "用户名或密码不正确" });
    }
  } catch (error) {
    console.error("登录接口错误:", error);
    res.status(500).json({ code: 500, msg: "服务器错误" });
  }
};
module.exports = { login };
