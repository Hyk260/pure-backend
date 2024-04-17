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

module.exports = {
  setKey,
  getKey,
  deleteKey,
};
