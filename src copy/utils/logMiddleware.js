const { isDev } = require("../config");

module.exports = function logMiddleware(app) {
  if (!isDev) return;
  const fs = require("fs");
  const path = require("path");
  const logger = require("morgan");
  try {
    const base = path.join(process.cwd(), "/access.log");
    // 创建写入流（日志）
    const stream = fs.createWriteStream(base, {
      flags: "a",
    });
    app.use(logger("combined", { stream }));
  } catch (error) {
    console.log("logMiddleware", error);
  }
};
