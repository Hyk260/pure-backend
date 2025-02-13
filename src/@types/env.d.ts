declare namespace NodeJS {
  interface ProcessEnv {
    // 基础配置
    PORT: string
    NODE_ENV: 'development' | 'production'
  }
}