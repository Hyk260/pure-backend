"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeUsers = storeUsers;
exports.getUserInfo = getUserInfo;
const config_1 = __importDefault(require("../config"));
const constants_1 = require("./constants");
const index_1 = require("../lowdb/index");
const init_1 = __importDefault(require("./init"));
const { dataBaseMode } = config_1.default.options;
// LowDB 策略实现
class LowdbStrategy {
    async storeUsers(credentials) {
        await (0, index_1.storeLowdbUsers)(credentials);
    }
    async getUserInfo(username) {
        return (0, index_1.getLowdbUserInfo)(username);
    }
}
// Redis 策略实现
class RedisStrategy {
    redisClient;
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async storeUsers({ username, password }) {
        const key = `${constants_1.ACCOUNTS}:${username}`;
        await this.redisClient.hset(key, "username", username, "password", password);
    }
    async getUserInfo(username) {
        const key = `${constants_1.ACCOUNTS}:${username}`;
        const userData = await this.redisClient.hgetall(key);
        return Object.keys(userData).length > 0 ? userData : null;
    }
}
// 根据配置选择数据库策略
let strategy;
switch (dataBaseMode) {
    case "lowdb":
        strategy = new LowdbStrategy();
        break;
    case "localRedis":
        strategy = new RedisStrategy(init_1.default);
        break;
    case "cloudRedis":
        strategy = new RedisStrategy(init_1.default);
        break;
    default:
        throw new Error(`Unsupported database mode: ${dataBaseMode}`);
}
/**
 * 统一存储用户信息
 */
async function storeUsers(credentials) {
    try {
        await strategy.storeUsers(credentials);
        console.log("用户信息存储成功:", credentials.username);
    }
    catch (error) {
        console.error("存储用户信息时出错:", error);
        throw new Error("用户注册失败");
    }
}
/**
 * 统一查询用户信息
 */
async function getUserInfo(username) {
    try {
        return await strategy.getUserInfo(username);
    }
    catch (error) {
        return null;
    }
}
