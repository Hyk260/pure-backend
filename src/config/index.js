const fs = require("fs");
const dotenv = require("dotenv");

const envPaths = [".env"];
if (fs.existsSync(".env.local")) {
  envPaths.unshift(".env.local");
}

// https://www.npmjs.com/package/dotenv
const envFound = dotenv.config({
  path: envPaths,
});
if (envFound.error) {
  console.error("⚠️  Couldn't find .env file  ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "development") {
  process.env.REDIS_PORT = "6379";
  process.env.REDIS_HOST = "127.0.0.1";
  process.env.REDIS_USER = "";
  process.env.REDIS_PASS = "";
}

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === "development",
  // databaseURL: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  // jwt过期时间
  expireTime: 86400 * 7,
  // jwt算法 HS256
  jwtAlgorithm: process.env.JWT_ALGO,
  // im app管理员id
  administrator: process.env.ADMIN_ISTRATOR,
  // im sdk
  imAppId: process.env.IM_SDK_APPID,
  imAppKey: process.env.IM_SDK_KEY,
  imServerBaseUrl: process.env.IM_SERVER_BASE_URL,
  // cos
  bucket: "ljx-1307934606", // 存储桶的名称
  region: "ap-beijing", // 存储桶所在地域
  secretId: process.env.SecretId,
  secretKey: process.env.SecretKey,
  // chatgpt
  openaiApiKey: process.env.OPENAI_API_KEY,
  options: {
    lowdbUser: `${process.env.LOWDB_URL}user.json`,
    // app absolute path
    basedir: __dirname,
  },
  github: {
    githubClientId: process.env.CLIENT_ID,
    githubClientSecret: process.env.CLIENT_SECRET,
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  redis: {
    mode: "lowdb", // vercel lowdb localhost
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "127.0.0.1",
    charset: "utf8_general_ci",
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASS || "",
  },
  api: {
    prefix: "/api",
  },
  // jwt免token白名单接口
  authOrity: [
    "/login",
    "/register",
    // "/rest-api",
    "/test",
    "/auth/github",
    "/github/callback",
    '/v1/chat/completions'
  ],
};
