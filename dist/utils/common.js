"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHubSecretKey = getGitHubSecretKey;
const config_1 = __importDefault(require("../config"));
const { clientId, clientSecret, clientIdApp, clientSecretApp } = config_1.default.github;
function getGitHubSecretKey(client = 'web') {
    const keys = {
        web: { clientId, clientSecret },
        app: { clientId: clientIdApp, clientSecret: clientSecretApp },
    };
    return keys[client];
}
