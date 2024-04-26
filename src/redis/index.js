const options = require("../config");
const { ACCOUNTS } = require("./constants");
const { lowdbUser } = require("../lowdb/init");

let redis = null;
let isVelcerKv = options.redis.mode === "vercel";
let isLocalhost = options.redis.mode === "localhost" && !options.isDev;
let isLowdb = options.redis.mode === "lowdb";
if (isVelcerKv) {
  redis = require("../velcel_kv/create-client");
} else if (isLocalhost) {
  redis = require("./init").redis;
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
    if (isLowdb) {
      // 是否注册
      const isExist = lowdbUser.get("user").find({ username: name }).value();
      if (isExist) {
        return "已注册";
      } else {
        lowdbUser.get("user").push({ username, password }).write();
        return "注册成功";
      }
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
    if (isLowdb) {
      const userData = lowdbUser.get("user").find({ username }).value();
      console.log("查询用户信息", userData);
      return userData;
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
