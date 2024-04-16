const express = require("express");
const config = require("./config");
const path = require("path");

/* 构建服务器 */
async function consturctServer(moduleDefs) {
  const app = express();
  // console.log("config:", config);
  /* 设置静态文件目录 */
  app.use(express.static(path.join(process.cwd(), "public")));
  return app;
}

/* Serve the NCM API. */
async function serveNcmApi(options) {
  const port = Number(options.port || process.env.PORT || "8081");
  const host = options.host || process.env.HOST || "";
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
