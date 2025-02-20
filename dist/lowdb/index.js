"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeLowdbUsers = storeLowdbUsers;
exports.getLowdbUserInfo = getLowdbUserInfo;
const init_1 = require("./init");
async function storeLowdbUsers({ username, password }) {
    // 是否注册
    const isExist = init_1.lowdbUserDB.get("user").find((user) => user.username === username);
    if (isExist) {
        return "已注册";
    }
    else {
        init_1.lowdbUserDB.get("user").push({ username, password });
        init_1.lowdbUserDB.write();
        return "注册成功";
    }
}
async function getLowdbUserInfo(username) {
    const userData = init_1.lowdbUserDB.get("user").find({ username }).value();
    console.log("查询用户信息", userData);
    return userData;
}
