const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

export const log = (message: string, level = 'info') => {
  const timestamp = new Date().toISOString();
  let color = colors.reset;

  switch (level) {
    case 'error':
      color = colors.red;
      break;
    case 'warn':
      color = colors.yellow;
      break;
    case 'info':
      color = colors.cyan;
      break;
    case 'debug':
      color = colors.green;
      break;
  }

  console.log(`${color}[${timestamp}] [${level.toUpperCase()}] => ${message}${colors.reset}`);
};