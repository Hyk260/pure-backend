"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = __importDefault(require("../config"));
const redis = new ioredis_1.default({
    port: Number(config_1.default.redis.port), // 端口号
    host: config_1.default.redis.host, // ip
    username: config_1.default.redis.username,
    password: config_1.default.redis.password,
    connectTimeout: 10000,
    db: 0,
});
// 连接成功时的回调
redis.on("connect", () => {
    console.log("Redis连接成功");
});
// 连接错误时的回调
redis.on("error", (err) => {
    console.error("Redis连接错误" + err);
    redis.quit();
});
exports.default = redis;
