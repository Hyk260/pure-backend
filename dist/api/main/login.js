"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
exports.handleLoginSuccess = handleLoginSuccess;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signature_1 = require("../../utils/signature");
const redis_1 = require("../../redis");
const config_1 = __importDefault(require("../../config"));
const { jwtSecret, expireTime, isDev, options } = config_1.default;
// 生成用户身份验证令牌
function getToken(user) {
    return jsonwebtoken_1.default.sign(user, jwtSecret, { expiresIn: expireTime });
}
// 验证用户信息，并返回用户数据
async function verifyUser(username, password) {
    const userData = await (0, redis_1.getUserInfo)(username);
    if (userData && userData?.password == password) {
        const { password, ...data } = userData;
        return data;
    }
    else {
        return null;
    }
}
function handleLoginSuccess(res, user) {
    const { username } = user;
    res.setHeader("Access-Control-Expose-Headers", "x-token");
    // 注意默认情况 Token 必须以 Bearer+空格 开头
    res.setHeader("X-token", `Bearer ${getToken(user)}`);
    const data = {
        username,
        userSig: (0, signature_1.generateUserSig)({ identifier: username }),
    };
    res.status(200).json({ code: 200, msg: "登录成功", result: data });
}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("login", `用户名：${username}`, `密码：${password}`);
        if (!username || !password) {
            res.status(400).json({ code: 400, msg: "请求不合法" });
        }
        // 用于测试环境 无数据库 情况下免密码登陆
        if (isDev && !options.dataBaseMode) {
            handleLoginSuccess(res, { username });
            return;
        }
        const user = await verifyUser(username, password);
        if (user) {
            handleLoginSuccess(res, user);
        }
        else {
            res.status(400).json({ code: 400, msg: "用户名或密码不正确" });
        }
    }
    catch (error) {
        console.error("登录接口错误:", error);
        res.status(500).json({ code: 500, msg: "服务器错误" });
    }
};
exports.login = login;
