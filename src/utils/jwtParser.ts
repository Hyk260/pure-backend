import expressJwt from 'express-jwt'
import { jwtSecret, authOrity } from '../config'

export expressJwt({
  secret: jwtSecret,
  algorithms: ['HS256'], // 指定解析密文的算法
}).unless({
  // 忽略项
  path: authOrity,
})
