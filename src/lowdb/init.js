const lowdb = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");
const CryptoJS = require("crypto-js");

const dbUser = path.resolve(__dirname, "../db/user.json");
const secretKey = process.env.LOWDB_ENCRYPTION_KEY;

function encrypt(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decrypt(data) {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const adapter = new FileSync(dbUser, {
  serialize: (data) => encrypt(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(decrypt(data)),
});

// 初始化lowdb
const lowdbUser = lowdb(adapter);

// 设置初始数据
// lowdbUser.defaults({ user: [] }).write();

// 写入数据
// lowdbUser.get("user").push({ username: "admin", password: "123456" }).write();

// 读取数据
// const user = lowdbUser.get("user").find({ username:"admin", password:'123456' }).value();
// const user = lowdbUser.get("user").value();
// console.log(user, 'user');

module.exports = {
  lowdbUser,
};
