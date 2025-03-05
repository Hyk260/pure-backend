import { Request, Response, NextFunction } from 'express';
import { log } from '../utils/logger';

export function corsHandler(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  // 检查请求路径，如果不是根路径且不包含'.'，则处理CORS
  if (req.path !== '/' && !req.path.includes('.')) {
    // 设置响应头，允许跨域请求
    res.set({
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Headers': 'Content-Type, authorization, Origin, X-Requested-With, Accept',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
    })
  }
  // 如果请求方式为OPTIONS，返回204状态码
  if (req.method === 'OPTIONS') {
    res.status(204).end();
  } else {
    next();
  }
}

// 允许的来源列表，包括域名和 IP 地址
const allowedOrigins: ReadonlyArray<string> = [
  // 'https://your-username.github.io/your-repo', // GitHub Pages 域名
  'http://localhost:8080', // web本地开发
  // 'http://your-server-ip', // 在特定 IP 上的应用程序
];

// 自定义 CORS 选项
export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    log(`origin:${origin}`);
    // if (origin && allowedOrigins.includes(origin) || !origin) {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Not allowed by CORS'));
    // }
  }
};