import path from 'node:path';
import lowdb from "lowdb";
// import { fileURLToPath } from 'node:url';
// import { find } from 'lodash-es';
import FileSync from "lowdb/adapters/FileSync";
import { encrypt, decrypt } from "../utils/crypto";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const secretKey = process.env.LOWDB_ENCRYPTION_KEY || "";

// userTest.json
// {
//   "user": [
//     {
//       "username": "admin",
//       "password": "123456"
//     }
//   ]
// }

const dbPath = secretKey
  ? path.resolve(__dirname, "../db/user.json")
  : path.resolve(__dirname, "../db/userTest.json");

const dbConfig = secretKey ? {
  serialize: (data: any) => encrypt(JSON.stringify(data), secretKey),
  deserialize: (data: string) => JSON.parse(decrypt(data, secretKey))
} : {};


// 初始化lowdb
const adapter = new FileSync(dbPath, dbConfig);

// 初始化lowdb
export const lowdbUserDB = lowdb(adapter);

// console.log(lowdbUserDB.get("user").value());

// console.log(lowdbUserDB.get("user").find({ username: "admin" }).value());