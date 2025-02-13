import expressJwt from 'express-jwt'
import config from '../config'

export default expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'], // 指定解析密文的算法
}).unless({
  // 忽略项
  path: config.authOrity,
})
