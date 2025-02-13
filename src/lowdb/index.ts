import { lowdbUser } from "./init";
import { UserCredentials } from '../types/index';

export async function storeLowdbUsers({ username, password } : UserCredentials) {
  // 是否注册
  const isExist = lowdbUser.get("user").find((user: any) => user.username === username);
  if (isExist) {
    return "已注册";
  } else {
    lowdbUser.get("user").push({ username, password });
    lowdbUser.write();
    return "注册成功";
  }
}

export async function getLowdbUserInfo(username : string) {
  const userData = lowdbUser.get("user").find({ username }).value();
  console.log("查询用户信息", userData);
  return userData;
}
