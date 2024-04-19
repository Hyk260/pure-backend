const express = require("express");
const uploader = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

const mainRouter = require("./routes");
const logMiddleware = require("./utils/logMiddleware");
// const userAuthorize = require("./utils/userAuthorize");
const corsHandler = require("./utils/corsHandler");
const jwtParser = require("./utils/jwtParser");
const config = require("./config");

/* 构建服务器 */
async function consturctServer(moduleDefs) {
  const app = express();
  console.log("config:", config);
  /* CORS 处理跨域请求 */
  app.use(corsHandler);
  /* 日志 */
  app.use(logMiddleware());
  /* 文件上载 */
  app.use(bodyParser.urlencoded({ extended: false }));
  /* 解析请求正文 支持URL编码和JSON格式 */
  app.use(bodyParser.json());
  app.use(uploader());
  /* 设置静态文件目录 */
  app.use(express.static(path.join(process.cwd(), "public")));
  /* 自定义中间件JWT校验 */
  // app.use(userAuthorize);
  /* 解析和验证JWT */
  app.use(jwtParser);
  /* 路由 */
  app.use("/", mainRouter);
  /* 处理未经授权的错误 */
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).send({ msg: "未授权!!!", code: 401 });
    } else {
      res.status(500).send("Internal Server Error");
    }
    next();
  });
  return app;
}

/* Serve the NCM API. */
async function serveNcmApi(options) {
  const port = Number(options.port || process.env.PORT);
  const host = options.host || process.env.HOST;
  const app = await consturctServer(options.moduleDefs);
  const appExt = app;
  appExt.server = app.listen(port, host, () => {
    console.log(`server running @ http://${host ? host : "localhost"}:${port}`);
  });
  return appExt;
}

module.exports = {
  serveNcmApi,
};
