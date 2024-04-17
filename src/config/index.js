const dotenv = require("dotenv");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// https://www.npmjs.com/package/dotenv
const envFound = dotenv.config({ path: [".env.local", ".env"] });

if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

module.exports = {
  port: parseInt(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  // databaseURL: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  // jwt过期时间
  expireTime: 86400 * 7,
  // jwtAlgorithm: process.env.JWT_ALGO,
  administrator: process.env.ADMIN_ISTRATOR, // app管理员id
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
    // app absolute path
    basedir: __dirname,
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  redis: {
    port: 20666,
    host: process.env.REDIS_HOST || "localhost",
    charset: "utf8_general_ci",
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASS || "123456",
  },
  mongodb: {},
  api: {
    prefix: "/api",
  },
  // jwt免token白名单接口
  authOrity: ["/login", "/register", "/rest-api", "/test"],
};
