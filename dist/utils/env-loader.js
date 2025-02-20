"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = loadEnv;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
// 环境变量加载器
function loadEnv() {
    const rootPath = process.cwd();
    // 定义环境文件优先级（后面的优先级更高）
    const envFiles = [
        node_path_1.default.join(rootPath, '.env'), // 基础配置
        node_path_1.default.join(rootPath, '.env.local'), // 本地覆盖配置
    ];
    if (process.env.NODE_ENV === 'production') {
        envFiles.push(node_path_1.default.join(rootPath, '.env.pro')); // 生产环境配置
    }
    // 按优先级顺序加载环境文件
    envFiles.forEach(file => {
        if (node_fs_1.default.existsSync(file)) {
            dotenv_1.default.config({
                path: file,
                override: true // 允许后续文件覆盖前面文件的配置
            });
            console.log(`Loaded environment variables from: ${node_path_1.default.basename(file)}`);
        }
    });
    // console.log("process.env", process.env);
}
loadEnv();
