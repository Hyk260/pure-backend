"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_js_1 = __importDefault(require("crypto-js"));
function encrypt(data, secretKey) {
    if (!secretKey)
        throw new Error("Encryption key is required");
    return crypto_js_1.default.AES.encrypt(data, secretKey).toString();
}
function decrypt(cipherText, secretKey) {
    if (!secretKey)
        throw new Error("Encryption key is required");
    const bytes = crypto_js_1.default.AES.decrypt(cipherText, secretKey);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
}
