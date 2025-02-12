const expressJwt = require('express-jwt')
const { jwtSecret, authOrity } = require('../config')

module.exports = expressJwt({
  secret: jwtSecret,
  algorithms: ['HS256'], // 指定解析密文的算法
}).unless({
  // 忽略项
  path: authOrity,
})
