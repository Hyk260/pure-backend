# pure-chat-api

PureChat Node.js API service

# 环境变量

开发环境（npm run dev）：

.env → 基础配置

.env.local → 本地通用覆盖

.env.development.local → 开发环境特定配置

生产环境（npm run server）：

.env.production → 生产环境配置

# 开发

- src/db/userTest.json 添加用户信息 测试账号默认密码 123456 username 为用户名 与腾讯 im userID 一致
- 注册用户账号 https://console.cloud.tencent.com/im/account-management
- 获取腾讯 im sdkappid && appkey 配置到 .env （带\*为必填项）
- 启动 npm run dev
