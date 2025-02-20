"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
exports.callback = callback;
const index_1 = __importDefault(require("../api/github/index"));
const common_1 = require("../utils/common");
const register_1 = require("../api/main/register");
const login_1 = require("../api/main/login");
async function authorize(req, res) {
    const client = req.query.client;
    const { clientId } = (0, common_1.getGitHubSecretKey)(client) || {};
    if (!clientId)
        res.status(400).json({ error: "Invalid client ID" });
    const query = {
        client_id: clientId,
        // scope: '',
        // allow_signup: 'true',
    };
    const url = `https://github.com/login/oauth/authorize?${new URLSearchParams(query).toString()}`;
    res.status(200).json({ url });
}
async function callback(req, res) {
    const code = req.query.code;
    const client = req.query.client;
    if (!code || !client)
        res.status(400).json({ error: "Invalid code or client" });
    try {
        const userInfo = await index_1.default.getUserInfo(code, client);
        if (!userInfo) {
            res.status(400).json({ error: "授权失败" });
        }
        else {
            const { avatar_url, id, login } = userInfo;
            console.log('userInfo', userInfo);
            await (0, register_1.registerAccount)({ id: id.toString(), nick: login, avatar: avatar_url });
            (0, login_1.handleLoginSuccess)(res, { username: id.toString() });
        }
    }
    catch (error) {
        console.error("Error during GitHub OAuth callback:", error);
        res.status(500).json({ error: "服务器内部错误" });
    }
}
