"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
const config_1 = __importDefault(require("../config"));
exports.default = (0, express_jwt_1.default)({
    secret: config_1.default.jwtSecret,
    algorithms: ['HS256'], // 指定解析密文的算法
}).unless({
    // 忽略项
    path: config_1.default.authOrity,
});
