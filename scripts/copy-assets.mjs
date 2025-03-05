import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from "node:url";
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copyFile = (src, dest) => {
  const dir = dirname(dest);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  copyFileSync(src, dest);
};

// 复制 db 目录
const srcDb = join(__dirname, '../src/db');
const destDb = join(__dirname, '../dist/db');
if (existsSync(srcDb)) {
  if (!existsSync(destDb)) {
    mkdirSync(destDb, { recursive: true });
  }
  readdirSync(srcDb).forEach(file => {
    const srcPath = join(srcDb, file);
    const destPath = join(destDb, file);
    copyFile(srcPath, destPath);
  });
}