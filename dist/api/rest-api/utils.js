"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomInt32 = generateRandomInt32;
exports.getUserSig = getUserSig;
exports.buildURL = buildURL;
const config_1 = __importDefault(require("../../config"));
const signature_1 = require("../../utils/signature");
const { imAppId, administrator } = config_1.default;
let cachedSig = "";
let cacheExpiration = null;
function generateRandomInt32() {
    return Math.floor(Math.random() * 0x100000000);
}
function getUserSig() {
    const now = Date.now();
    if (cachedSig && cacheExpiration && cacheExpiration > now) {
        return cachedSig;
    }
    cachedSig = (0, signature_1.generateUserSig)({ identifier: administrator });
    cacheExpiration = now + 60 * 60 * 1000;
    return cachedSig;
}
function buildURL(baseURL) {
    const params = {
        sdkappid: imAppId,
        identifier: administrator,
        usersig: getUserSig(),
        random: generateRandomInt32(),
        contenttype: "json",
    };
    const enCode = (t) => encodeURIComponent(t);
    const query = Object.keys(params)
        .map((key) => {
        return `${enCode(key)}=${enCode(params[key])}`;
    })
        .join("&");
    return `${baseURL}?${query}`;
}
