import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { generateUserSig } from "../../utils/signature";
import { getUserInfo } from "../../redis";
import config from "../../config";

type UserInfo = {
  username: string,
  password: string,
}

const { jwtSecret, expireTime, isDev, options } = config

// 生成用户身份验证令牌
function getToken(user: any): string {
  return jwt.sign(user, jwtSecret, { expiresIn: expireTime });
}

// 验证用户信息，并返回用户数据
async function verifyUser(username: string, password: string): Promise<object | null> {
  const userData = await getUserInfo(username);
  if (userData && userData?.password == password) {
    const { password, ...data } = userData;
    return data;
  } else {
    return null;
  }
}

export function handleLoginSuccess(res: Response, user: any) {
  const { username } = user;
  res.setHeader("Access-Control-Expose-Headers", "x-token");
  // 注意默认情况 Token 必须以 Bearer+空格 开头
  res.setHeader("X-token", `Bearer ${getToken(user)}`);
  const data = {
    username,
    userSig: generateUserSig({ identifier: username }),
  };
  res.status(200).json({ code: 200, msg: "登录成功", result: data });
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body as UserInfo;
    console.log("login", `用户名：${username}`, `密码：${password}`);
    if (!username || !password) {
      res.status(400).json({ code: 400, msg: "请求不合法" });
    }
    // 用于测试环境 无数据库 情况下免密码登陆
    if (isDev && !options.dataBaseMode) {
      handleLoginSuccess(res, { username });
      return;
    }
    const user = await verifyUser(username, password);

    if (user) {
      handleLoginSuccess(res, user);
    } else {
      res.status(400).json({ code: 400, msg: "用户名或密码不正确" });
    }
  } catch (error) {
    console.error("登录接口错误:", error);
    res.status(500).json({ code: 500, msg: "服务器错误" });
  }
};
