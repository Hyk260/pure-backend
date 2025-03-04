import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { log } from './logger'

// 环境变量加载器
export function loadEnv() {
  const rootPath = process.cwd()

  // 获取当前环境，默认为开发环境
  const env = process.env.NODE_ENV || 'development';

  // 定义环境文件优先级（后面的优先级更高）
  const envFiles = [
    path.join(rootPath, '.env'),
    path.join(rootPath, '.env.local'),
    path.join(rootPath, '.env.development.local'),
  ]

  if (env === 'production') {
    envFiles.push(path.join(rootPath, '.env.production'))
    envFiles.push(path.join(rootPath, '.env.production.local'))
  }

  // 按优先级顺序加载环境文件
  envFiles.forEach(file => {
    log(`📚 file: ${file}`)
    if (fs.existsSync(file)) {
      dotenv.config({
        path: file,
        override: true // 允许后续文件覆盖前面文件的配置
      })
      log(`✅ loaded: ${path.basename(file)}`)
    }
  })
}

loadEnv()