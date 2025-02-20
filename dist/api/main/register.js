"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAccount = registerAccount;
const rest_api_1 = require("../rest-api");
async function registerAccount({ id = '', nick = "", avatar = "" }) {
    // 查询im账号
    const account = await (0, rest_api_1.accountCheck)([{ UserID: id }]);
    // 注册im账号
    if (!account) {
        await (0, rest_api_1.accountImport)({ UserID: id, Nick: nick, FaceUrl: avatar });
    }
}
