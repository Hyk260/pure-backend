const low = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");
const crypto = require("crypto");
const dbUser = path.resolve(__dirname, "../db/user.json");

// 加密密钥
const ENCRYPTION_KEY = process.env.LOWDB_ENCRYPTION_KEY;

// 简单加密函数
function encrypt(text) {
  const cipher = crypto.createCipher("aes-256-cbc", ENCRYPTION_KEY);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// 简单解密函数
function decrypt(text) {
  const decipher = crypto.createDecipher("aes-256-cbc", ENCRYPTION_KEY);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// 创建一个加密的adapter
const adapter = new FileSync(dbUser, {
  serialize: (data) => encrypt(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(decrypt(data)),
});

// 初始化lowdb
const db = low(adapter);

// 设置初始数据
db.defaults({ posts: [] }).write();

// 写入数据
db.get("posts").push({ id: 1, title: "lowdb is awesome" }).write();

// 读取数据
const posts = db.get("posts").value();
console.log(posts);
