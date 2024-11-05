const lowdb = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");
const CryptoJS = require("crypto-js");

let configure = {};
let dbUser = path.resolve(__dirname, "../db/userCopy.json");

const secretKey = process.env.LOWDB_ENCRYPTION_KEY;

function encrypt(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decrypt(data) {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

if (secretKey.length) {
  dbUser = path.resolve(__dirname, "../db/user.json");
  configure = {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data)),
  };
}

const adapter = new FileSync(dbUser, configure);

// 初始化lowdb
const lowdbUser = lowdb(adapter);

// console.log(dbUser)

// 设置初始数据
// lowdbUser.defaults({ user: [] }).write();

// 读取数据
// const user = lowdbUser
//   .get("user")
//   .find({ username: "wangjie", password: "123456" })
//   .value();
// 写入数据
// if (!user) {
//   lowdbUser
//     .get("user")
//     .push({ username: "wangjie", password: "123456" })
//     .write();
// }

const userAll = lowdbUser.get("user").value();
console.log(userAll, "user");

module.exports = {
  lowdbUser,
};
