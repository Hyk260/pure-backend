const { options } = require("../config");
const { ACCOUNTS } = require("./constants");
const { storeLowdbUsers, getLowdbUserInfo } = require("../lowdb/index");

const { dataBaseMode } = options;

let redis = null;
const localRedis = dataBaseMode === "localRedis"; // 使用本地redis
const lowdb = dataBaseMode === "lowdb"; // 使用lowdb
// https://app.redislabs.com/
const cloudRedis = dataBaseMode === "cloudRedis"; // 使用cloudRedis

if (localRedis || cloudRedis) {
  redis = require("./init");
}

// 设置键值对
async function setKey(key, value) {
  try {
    await redis.set(key, value);
    console.log(`Set key '${key}' with value '${value}'`);
  } catch (error) {
    console.error(error);
  }
}

// 获取键的值
async function getKey(key) {
  try {
    const value = await redis.get(key);
    console.log(`Value for key '${key}': ${value}`);
    return value;
  } catch (error) {
    console.error(error);
  }
}

// 删除键
async function deleteKey(key) {
  try {
    const result = await redis.del(key);
    console.log(`Deleted key '${key}': ${result}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * 注册用户信息
 */
async function storeUsers({ username: name, password: pass }) {
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
async function getUserInfo(username) {
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

function quit() {
  redis.quit();
}

module.exports = {
  storeUsers,
  getUserInfo,
  setKey,
  getKey,
  deleteKey,
  quit,
};
