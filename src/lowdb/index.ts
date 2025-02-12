import { lowdbUser } from "./init";

export async function storeLowdbUsers({ username, password }) {
  // 是否注册
  const isExist = lowdbUser.get("user").find({ username }).value();
  if (isExist) {
    return "已注册";
  } else {
    lowdbUser.get("user").push({ username, password }).write();
    return "注册成功";
  }
}

export async function getLowdbUserInfo(username) {
  const userData = lowdbUser.get("user").find({ username }).value();
  console.log("查询用户信息", userData);
  return userData;
}
