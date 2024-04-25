const options = require("../config");
const { ACCOUNTS } = require("./constants");

let redis = null;
if (options.redis.mode === "vercel") {
  redis = require("../velcel_kv/create-client");
} else if (options.redis.mode === "localhost" && !options.isDev){
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
    const key = `${ACCOUNTS}:${name}`;
    const res = await redis.hmset(key, "username", name, "password", pass);
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
    const key = `${ACCOUNTS}:${username}`;
    const userData = await redis.hgetall(key);
    console.log("查询用户信息", userData);
    return userData;
    // const user = await redis.hget(key, "username");
    // const pass = await redis.hget(key, "password");
    // console.log("查询用户信息", user, pass);
    // if (!user && !pass) return null;
    // return {
    //   username: user,
    //   password: pass,
    // };
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
