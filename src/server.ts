import './utils/env-loader'
import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import bodyParser from "body-parser";
import jwtParser from './utils/jwtParser';
import mainRouter from './routes/index';
import { ServerOptions } from './types/index';

function corsHandler(req: Request, res: Response, next: NextFunction) {
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
    })
  }
  // 如果请求方式为OPTIONS，返回204状态码
  req.method === 'OPTIONS' ? res.status(204).end() : next()
}

function unauthorizedErrorHandling(err: Error, req: Request, res: Response, next: NextFunction) {
  const errorResponse = (statusCode: number, message: string) => res.status(statusCode).send({ msg: message, code: statusCode });

  if (err.name === "UnauthorizedError") {
    errorResponse(401, "未授权!!!");
  } else {
    errorResponse(500, "Internal Server Error");
  }

  next();
}

async function constructServer() {
  const app = express();

  app.use(corsHandler);

  /* 解析请求正文 支持URL编码和JSON格式 */
  app.use(bodyParser.json());

  /* 设置静态文件目录 */
  app.use(express.static(path.join(process.cwd(), "public")));

  /* 解析和验证JWT */
  app.use(jwtParser);

  /* 路由 */
  app.use("/", mainRouter);

  /* 处理未经授权的错误 */
  app.use(unauthorizedErrorHandling);

  return app;
}

async function serveNcmApi(options: ServerOptions) {
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
})

