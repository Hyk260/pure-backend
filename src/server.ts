import './utils/env-loader'
import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import cors from 'cors';
import bodyParser from "body-parser";
import jwtParser from './utils/jwtParser';
import mainRouter from './routes/index';
import { configuration } from './config';
import { log } from './utils/logger';
import { corsHandler, corsOptions } from './utils/corsHandler';
import { ServerOptions } from './types/index';

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

  // 使用 CORS 中间件
  // app.use(cors(corsOptions));

  /* 解析请求正文 支持URL编码和JSON格式 */
  app.use(bodyParser.json());

  /* 设置静态文件目录 */
  app.use(express.static(path.join(process.cwd(), "public")));

  /* 解析和验证JWT */
  if (process.env.ENABLE_JWT === 'Y') {
    app.use(jwtParser);
  }

  /* 路由 */
  app.use("/", mainRouter);

  /* 处理未经授权的错误 */
  app.use(unauthorizedErrorHandling);

  return app;
}

async function serveNcmApi(options: ServerOptions) {
  console.log("config", configuration());
  const port = Number(options.port || process.env.PORT);
  const host = options.host || process.env.HOST || "localhost";

  const appExt = await constructServer();

  appExt.listen(port, host, () => {
    log(`PureChat API Local: http://${host}:${port}`);
  });

  return appExt;
}

serveNcmApi({
  port: 8081,
  host: '',
})

