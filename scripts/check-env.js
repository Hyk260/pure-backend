import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'

// 测试
// const DEVELOPMENT_ENV_FILE = '.env.development.Test.local';
// const LOCAL_ENV_FILE = '.env.Test.local';

const DEVELOPMENT_ENV_FILE = '.env.development.local';
const PRODUCTION_LOCAL_ENV_FILE = ".env.production.local";
const LOCAL_ENV_FILE = '.env.local';

const envFiles = [
  PRODUCTION_LOCAL_ENV_FILE,
  DEVELOPMENT_ENV_FILE,
  LOCAL_ENV_FILE
];

// 定义不同环境的默认配置内容
const envConfig = {
  [DEVELOPMENT_ENV_FILE]: `
# 开发环境配置
`,
  [LOCAL_ENV_FILE]: `
# 本地环境配置
`,
  [PRODUCTION_LOCAL_ENV_FILE]: `
# 生产环境配置
`
};

// 遍历文件列表，依次创建或检查文件
envFiles.forEach((envFile) => {
  // 构建文件的完整路径
  const envPath = join(process.cwd(), envFile);

  if (!existsSync(envPath)) {
    try {
      // 根据文件名获取对应的配置内容
      const defaultEnvContent = envConfig[envFile];
      // 写入默认配置内容
      writeFileSync(envPath, defaultEnvContent, 'utf8');
      console.log(chalk.green(`✨ 成功创建 ${envFile} 文件`));
    } catch (error) {
      console.log(chalk.red(`\n✗ 创建 ${envFile} 文件失败。`));
      process.exit(1);
    }
  } else {
    console.log(chalk.green(`✓ ${envFile} 文件已创建`));
  }
});