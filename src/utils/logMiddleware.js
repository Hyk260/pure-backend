const fs = require("fs");
const path = require("path");
const logger = require("morgan");
const base = path.join(process.cwd(), "/access.log");

// 创建写入流（日志）
const stream = fs.createWriteStream(base, {
  flags: "a",
});

function logMiddleware() {
  return logger("combined", { stream });
}

module.exports = logMiddleware;
