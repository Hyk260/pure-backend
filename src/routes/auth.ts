import { Request, Response } from 'express';
import GitHubAPI from "../api/github/index";
import { getGitHubSecretKey } from '../utils/common';
import { registerAccount } from "../api/main/register";
import { handleLoginSuccess } from "../api/main/login";
import { ClientType, UserInfoType } from '../types';

export async function authorize(req: Request, res: Response): Promise<void> {
  const client = req.query.client as ClientType;
  const { clientId } = getGitHubSecretKey(client) || {};
  
  if (!clientId) {
    res.json({ error: "Invalid client ID" });
    return;
  }

  const query: Record<string, string> = {
    client_id: clientId,
    // scope: '',
    // allow_signup: 'true',
  };

  const url = `https://github.com/login/oauth/authorize?${new URLSearchParams(query).toString()}`;
  res.status(200).json({ url });
}

export async function callback(req: Request, res: Response): Promise<void> {
  const code = req.query.code as string | undefined;
  const client = req.query.client as ClientType | undefined;

  if (!code || !client) {
    res.status(400).json({ error: "Invalid code or client" })
    return
  }

  try {
    const userInfo = await GitHubAPI.getUserInfo(code, client);

    if (!userInfo) {
      res.status(400).json({ error: "授权失败" });
    } else {
      const { avatar_url, id, login } = userInfo as UserInfoType;

      console.log('userInfo', userInfo);

      await registerAccount({ id: id.toString(), nick: login, avatar: avatar_url });
      handleLoginSuccess(res, { username: id.toString() });
    }
  } catch (error) {
    console.error("Error during GitHub OAuth callback:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
}
