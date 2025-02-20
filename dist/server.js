"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./utils/env-loader");
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config"));
const jwtParser_1 = __importDefault(require("./utils/jwtParser"));
const index_1 = __importDefault(require("./routes/index"));
function corsHandler(req, res, next) {
    // 检查请求路径，如果不是根路径且不包含'.'，则处理CORS
    if (req.path !== '/' && !req.path.includes('.')) {
        // 设置响应头，允许跨域请求
        res.set({
            // 允许跨域的域名，*代表允许任意域名跨域
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            // 允许的header类型
            'Access-Control-Allow-Headers': 'Content-Type, authorization, Origin, X-Requested-With, Accept',
            // 跨域允许的请求方式
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8',
        });
    }
    // 如果请求方式为OPTIONS，返回204状态码
    req.method === 'OPTIONS' ? res.status(204).end() : next();
}
function unauthorizedErrorHandling(err, req, res, next) {
    const errorResponse = (statusCode, message) => res.status(statusCode).send({ msg: message, code: statusCode });
    if (err.name === "UnauthorizedError") {
        errorResponse(401, "未授权!!!");
    }
    else {
        errorResponse(500, "Internal Server Error");
    }
    next();
}
async function constructServer() {
    const app = (0, express_1.default)();
    app.use(corsHandler);
    /* 解析请求正文 支持URL编码和JSON格式 */
    app.use(body_parser_1.default.json());
    /* 设置静态文件目录 */
    app.use(express_1.default.static(node_path_1.default.join(process.cwd(), "public")));
    /* 解析和验证JWT */
    app.use(jwtParser_1.default);
    /* 路由 */
    app.use("/", index_1.default);
    /* 处理未经授权的错误 */
    app.use(unauthorizedErrorHandling);
    return app;
}
async function serveNcmApi(options) {
    console.log("config", config_1.default);
    const port = Number(options.port || process.env.PORT);
    const host = options.host || process.env.HOST || "localhost";
    const appExt = await constructServer();
    appExt.listen(port, host, () => {
        console.log(`PureChat API Local: http://${host}:${port}`);
    });
    return appExt;
}
serveNcmApi({
    port: 8081,
    host: '',
});
