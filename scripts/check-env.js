import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import chalk from 'chalk'

const envLocal = '.env.local'
const envPath = join(process.cwd(), envLocal)

if (!existsSync(envPath)) {
  const defaultEnvContent = `# JWT_SECRET`
  try {
    writeFileSync(envPath, defaultEnvContent, 'utf8')
    console.log(chalk.green('✨ 成功创建.env.local文件'))
  } catch (error) {
    console.log(chalk.red('\n✗ 创建.env.local文件失败。'))
    process.exit(1)
  }
} else {
  console.log(chalk.green('✓ .env.local文件已创建'))
}
