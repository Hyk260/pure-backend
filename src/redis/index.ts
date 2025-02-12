import config from "../config";
import { ACCOUNTS } from "./constants";
import { storeLowdbUsers, getLowdbUserInfo } from "../lowdb/index";

const { dataBaseMode } = config.options;

let redis: any = null;
const localRedis = dataBaseMode === "localRedis"; // 使用本地redis
const lowdb = dataBaseMode === "lowdb"; // 使用本地lowdb
// https://app.redislabs.com/
const cloudRedis = dataBaseMode === "cloudRedis"; // 使用cloudRedis

async function loadModule() {
  redis = await import("./init");
}

if (localRedis || cloudRedis) loadModule()

/**
 * 注册用户信息
 */
export async function storeUsers({ username: name, password: pass }) {
  try {
    if (lowdb) {
      return storeLowdbUsers({ username: name, password: pass });
    }

    const key = `${ACCOUNTS}:${name}`;
    const res = await redis.hset(key, "username", name, "password", pass);
    console.log("存储用户信息", res);
  } catch (error) {
    console.error("存储用户信息时出错:", error);
  }
}

/**
 * 查询用户信息
 */
export async function getUserInfo(username: any) {
  try {
    if (lowdb) {
      return getLowdbUserInfo(username);
    }

    const key = `${ACCOUNTS}:${username}`;
    const userData = await redis.hgetall(key);
    console.log("查询用户信息", userData);
    return userData;
  } catch (error) {
    console.error("查询用户信息时出错:", error);
    return null;
  }
}