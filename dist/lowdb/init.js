"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowdbUserDB = void 0;
const node_path_1 = __importDefault(require("node:path"));
const lowdb_1 = __importDefault(require("lowdb"));
// import { fileURLToPath } from 'node:url';
// import { find } from 'lodash-es';
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const crypto_1 = require("../utils/crypto");
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
    ? node_path_1.default.resolve(__dirname, "../db/user.json")
    : node_path_1.default.resolve(__dirname, "../db/userTest.json");
const dbConfig = secretKey ? {
    serialize: (data) => (0, crypto_1.encrypt)(JSON.stringify(data), secretKey),
    deserialize: (data) => JSON.parse((0, crypto_1.decrypt)(data, secretKey))
} : {};
// 初始化lowdb
const adapter = new FileSync_1.default(dbPath, dbConfig);
// 初始化lowdb
exports.lowdbUserDB = (0, lowdb_1.default)(adapter);
// console.log(lowdbUserDB.get("user").value());
// console.log(lowdbUserDB.get("user").find({ username: "admin" }).value());
