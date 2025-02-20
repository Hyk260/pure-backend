import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

// 环境变量加载器
export function loadEnv() {
  const rootPath = process.cwd()

  // 定义环境文件优先级（后面的优先级更高）
  const envFiles = [
    path.join(rootPath, '.env'),       // 基础配置
    path.join(rootPath, '.env.local'),  // 本地覆盖配置
  ]

  if (process.env.NODE_ENV === 'production') {
    envFiles.push(path.join(rootPath, '.env.pro')) // 生产环境配置
  }

  // 按优先级顺序加载环境文件
  envFiles.forEach(file => {
    if (fs.existsSync(file)) {
      dotenv.config({
        path: file,
        override: true // 允许后续文件覆盖前面文件的配置
      })
      console.log(`Loaded environment variables from: ${path.basename(file)}`)
    }
  })

  // console.log("process.env", process.env);
}

loadEnv()