module.exports = (req, res, next) => {
  // 检查请求路径，如果不是根路径且不包含'.'，则处理CORS
  if (req.path !== '/' && !req.path.includes('.')) {
    res.set({
      // 允许跨域的域名，*代表允许任意域名跨域
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      // 允许的header类型
      'Access-Control-Allow-Headers': 'Content-Type, authorization, Origin, X-Requested-With, Accept',
      // 跨域允许的请求方式
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
    })
  }
  // 如果请求方式为OPTIONS，返回204状态码
  req.method === 'OPTIONS' ? res.status(204).end() : next()
}