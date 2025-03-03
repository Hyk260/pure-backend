import config from "../config";
import { ACCOUNTS } from "./constants";
import { storeLowdbUsers, getLowdbUserInfo } from "../lowdb/index";
import { UserCredentials } from '../types/index';

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
  constructor(private readonly redisClient: any) {}

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

// 策略初始化
async function initializeStrategy(): Promise<DatabaseStrategy> {
  switch (dataBaseMode) {
    case "lowdb":
      return new LowdbStrategy();
    case "localRedis":
    case "cloudRedis":
      const redisModule = await import('./init');
      return new RedisStrategy(redisModule.default);
    default:
      throw new Error(`Unsupported database mode: ${dataBaseMode}`);
  }
}

// 初始化策略
const strategyPromise = initializeStrategy();

/**
 * 统一存储用户信息
 */
export async function storeUsers(credentials: UserCredentials): Promise<void> {
  const strategy = await strategyPromise;

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
  const strategy = await strategyPromise;

  try {
    return await strategy.getUserInfo(username);
  } catch (error) {
    console.error("查询用户信息时出错:", error);
    return null;
  }
}