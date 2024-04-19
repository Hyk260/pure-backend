const options = require("@/config");

let redis = null;
if (options.redis.mode === "vercel") {
  redis = require("@/velcel_kv/create-client");
} else {
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
 * 将用户信息存储到 Redis 数据库中
 * @param {Array<Object>} users - 包含用户信息的数组
 * @param {string} users[].username - 用户名
 * @param {string} users[].password - 密码
 */
async function storeUsers(users) {
  try {
    for (const { username, password } of users) {
      const res = await redis.hset(
        `user_accounts:${username}`,
        "username",
        username,
        "password",
        password
      );
      console.log("存储用户信息", res);
    }
  } catch (error) {
    console.error("存储用户信息时出错:", error);
  }
}
async function getUserInfo(username) {
  try {
    const userData = await redis.hgetall(`user_accounts:${username}`);
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
