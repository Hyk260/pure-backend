const jwt = require("jsonwebtoken");
const { jwtSecret, authOrity } = require("../config");

// 解析token
function decoded(req) {
  const token = req.get("Authorization");
  return token ? token.replace("Bearer ", "") : "";
}
// 封装 JWT 校验函数
function verifyJWT(token, secretKey) {
  return new Promise((res, rej) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          rej("JWT 已过期");
        } else {
          rej("JWT 校验失败");
        }
      } else {
        res(decoded);
      }
    });
  });
}

module.exports = async (req, res, next) => {
  // 从请求头中获取 JWT
  const token = decoded(req);
  // 如果是排除的路径 直接调用 next() 跳过 JWT 的检查
  if (authOrity.includes(req.path)) return next();
  if (!token) return next();
  try {
    const user = await verifyJWT(token, jwtSecret);
    console.log(user, "JWT 携带用户信息");
    // 校验成功 将解码后的数据保存到请求对象中
    if (user) req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ msg: error });
    next();
  }
};
