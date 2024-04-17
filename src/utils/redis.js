const Redis = require("ioredis");
const options = require("@/config");

const redis = new Redis({
  port: options.redis.port, // 端口号
  host: options.redis.host, // ip
  password: options.redis.password,
  connectTimeout: 10000,
  db: 0,
});

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

// 用户信息
// const users = [
//   {
//     username: "linjx",
//     password: "1234567",
//     phone: "",
//   },
// ];

// 存储用户信息
async function storeUsers(users) {
  try {
    for (const user of users) {
      await redis.hset(
        `user:${user.username}`,
        "username",
        user.username,
        "password",
        user.password,
        "phone",
        user.phone
      );
    }
  } catch (error) {
    console.error("存储用户信息时出错:", error);
  }
}
async function getUserInfo(username) {
  try {
    const userData = await redis.hgetall(`user:${username}`);
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
