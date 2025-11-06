import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

class Logger {
  constructor() {
    const envLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : null;
    const defaultLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
    this.level = envLevel && levels[envLevel] !== undefined ? envLevel : defaultLevel;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    this.logFile = path.resolve(__dirname, '../../logs/app.log');
    try {
      fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
    } catch (_) {
      // ignore directory creation errors
    }
  }

  format(level, message) {
    const timestamp = new Date().toISOString();
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
  }

  log(level, message) {
    if (levels[level] <= levels[this.level]) {
      const formatted = this.format(level, message);
      // Console output
      console.log(formatted);
      // Append to log file
      try {
        fs.appendFileSync(this.logFile, formatted + '\n');
      } catch (_) {
        // Silently ignore file write errors
      }
    }
  }

  error(message) {
    this.log('error', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  info(message) {
    this.log('info', message);
  }

  debug(message) {
    this.log('debug', message);
  }

  setLevel(newLevel) {
    if (levels[newLevel] !== undefined) {
      this.level = newLevel;
    }
  }
}

export const logger = new Logger();
