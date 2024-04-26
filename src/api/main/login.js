const jwt = require("jsonwebtoken");
const generateSig = require("../../utils/generateSig");
const { getUserInfo, getKey } = require("../../redis");
const { jwtSecret, expireTime, isDev, redis } = require("../../config");

/**
 * 生成用户身份验证令牌
 * @param {object} user - 包含用户身份信息的对象
 * @returns {string} 用户身份验证令牌
 */
function getToken(user) {
  return jwt.sign(user, jwtSecret, { expiresIn: expireTime });
}
/**
 * 验证用户信息，并返回用户数据（不包含密码）或false
 * @param {string} username - 用户名
 * @param {string} password - 用户密码
 * @returns {Object|boolean} 如果验证成功，则返回用户数据对象（不包含密码），否则返回false
 */
async function verifyUser(username, password) {
  const userData = await getUserInfo(username);
  if (userData && userData?.password == password) {
    const { password, ...data } = userData;
    return data;
  } else {
    return false;
  }
}

function handleLoginSuccess(res, user) {
  const { username } = user;
  res.setHeader("Access-Control-Expose-Headers", "x-token");
  // 注意默认情况 Token 必须以 Bearer+空格 开头
  res.setHeader("X-token", `Bearer ${getToken(user)}`);
  const data = {
    username,
    userSig: generateSig({ identifier: username }),
  };
  res.json({ code: 200, msg: "登录成功", result: data });
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("login", `username=${username}`, `password=${password}`);
    if (!username || !password) {
      return res.status(400).json({ code: 400, msg: "请求不合法" });
    }
    // 用于测试环境 无数据库 情况下免密码登陆
    if (isDev && redis.mode == "") {
      handleLoginSuccess(res, { username });
      return;
    }
    const user = await verifyUser(username, password);
    if (user) {
      handleLoginSuccess(res, user);
    } else {
      res.json({ code: 401, msg: "用户名或密码不正确" });
    }
  } catch (error) {
    console.error("登录接口错误:", error);
    res.status(500).json({ code: 500, msg: "服务器错误" });
  }
};
module.exports = { login };
