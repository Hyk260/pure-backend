import config from "../config";
import { ACCOUNTS } from "./constants";
import { storeLowdbUsers, getLowdbUserInfo } from "../lowdb/index";
import { UserCredentials } from '../types/index';
import redis from './init';

const { dataBaseMode } = config.options;

// 定义数据库策略接口
interface DatabaseStrategy {
  storeUsers(credentials: UserCredentials): Promise<void>;
  getUserInfo(username: string): Promise<Record<string, string> | null>;
}

// LowDB 策略实现
class LowdbStrategy implements DatabaseStrategy {
  async storeUsers(credentials: UserCredentials): Promise<void> {
    await storeLowdbUsers(credentials);
  }

  async getUserInfo(username: string): Promise<Record<string, string> | null> {
    return getLowdbUserInfo(username);
  }
}

// Redis 策略实现
class RedisStrategy implements DatabaseStrategy {
  constructor(private readonly redisClient: typeof redis) {}

  async storeUsers({ username, password }: UserCredentials): Promise<void> {
    const key = `${ACCOUNTS}:${username}`;
    await this.redisClient.hset(key, "username", username, "password", password);
  }

  async getUserInfo(username: string): Promise<Record<string, string> | null> {
    const key = `${ACCOUNTS}:${username}`;
    const userData = await this.redisClient.hgetall(key);
    return Object.keys(userData).length > 0 ? userData : null;
  }
}

// 根据配置选择数据库策略
let strategy: DatabaseStrategy;

switch (dataBaseMode) {
  case "lowdb":
    strategy = new LowdbStrategy();
    break;
  case "localRedis":
    strategy = new RedisStrategy(redis);
    break;
  case "cloudRedis":
    strategy = new RedisStrategy(redis);
    break;
  default:
    throw new Error(`Unsupported database mode: ${dataBaseMode}`);
}

/**
 * 统一存储用户信息
 */
export async function storeUsers(credentials: UserCredentials): Promise<void> {
  try {
    await strategy.storeUsers(credentials);
    console.log("用户信息存储成功:", credentials.username);
  } catch (error) {
    console.error("存储用户信息时出错:", error);
    throw new Error("用户注册失败");
  }
}

/**
 * 统一查询用户信息
 */
export async function getUserInfo(username: string): Promise<Record<string, string> | null> {
  try {
    const userInfo = await strategy.getUserInfo(username);
    console.log("用户信息查询成功:", username);
    return userInfo;
  } catch (error) {
    console.error("查询用户信息时出错:", error);
    return null;
  }
}