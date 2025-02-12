// src/@types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // 基础配置
    PORT: string
    NODE_ENV: 'development' | 'production'

    // 其他动态字段
    [key: string]: string | undefined
  }
}