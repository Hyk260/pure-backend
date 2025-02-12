import lowdb from "lowdb";
import path from "node:path";
import FileSync from "lowdb/adapters/FileSync";
import CryptoJS from "crypto-js";

let configure = {};
let dbUser = path.resolve(__dirname, "../db/userTest.json");

const secretKey = process.env.LOWDB_ENCRYPTION_KEY || "";

function encrypt(data: string) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decrypt(data: any) {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

if (secretKey.length) {
  dbUser = path.resolve(__dirname, "../db/user.json");
  configure = {
    serialize: (data: any) => encrypt(JSON.stringify(data)),
    deserialize: (data: any) => JSON.parse(decrypt(data)),
  };
}

const adapter = new FileSync(dbUser, configure);

// 初始化lowdb
export const lowdbUser = lowdb(adapter);
