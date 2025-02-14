import { lowdbUserDB } from "./init";
import { UserCredentials } from '../types/index';

export async function storeLowdbUsers({ username, password } : UserCredentials) {
  // 是否注册
  const isExist = lowdbUserDB.get("user").find((user: any) => user.username === username);
  if (isExist) {
    return "已注册";
  } else {
    lowdbUserDB.get("user").push({ username, password });
    lowdbUserDB.write();
    return "注册成功";
  }
}

export async function getLowdbUserInfo(username : string) {
  const userData = lowdbUserDB.get("user").find({ username }).value();
  console.log("查询用户信息", userData);
  return userData;
}
