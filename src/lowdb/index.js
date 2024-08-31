const { lowdbUser } = require("./init");

async function storeLowdbUsers({ username, password }) {
  try {
    // 是否注册
    const isExist = lowdbUser.get("user").find({ username }).value();
    if (isExist) {
      return "已注册";
    } else {
      lowdbUser.get("user").push({ username, password }).write();
      return "注册成功";
    }
  } catch (error) {
    console.error("存储用户信息时出错:", error);
  }
}

async function getLowdbUserInfo(username) {
  const userData = lowdbUser.get("user").find({ username }).value();
  console.log("查询用户信息", userData);
  return userData;
}

module.exports = {
  storeLowdbUsers,
  getLowdbUserInfo,
};
