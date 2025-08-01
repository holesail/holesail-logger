const colors = require('barely-colours');

class HolesailLogger {
  constructor ({ prefix = 'Holesail', enabled = false, level = 1 } = {}) {
    this.prefix = prefix;
    this.enabled = enabled;
    this.minLevel = level;
    this.LOG_LEVELS = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3
    };
  }

  log ({ type, msg }) {
    if (!this.enabled || type < this.minLevel) return;
    let levelStr, colorFunc, consoleMethod;
    switch (type) {
      case this.LOG_LEVELS.DEBUG:
        levelStr = 'DEBUG';
        colorFunc = colors.brightBlack;
        consoleMethod = console.log;
        break;
      case this.LOG_LEVELS.INFO:
        levelStr = 'INFO';
        colorFunc = colors.green;
        consoleMethod = console.log;
        break;
      case this.LOG_LEVELS.WARN:
        levelStr = 'WARN';
        colorFunc = colors.yellow;
        consoleMethod = console.warn;
        break;
      case this.LOG_LEVELS.ERROR:
        levelStr = 'ERROR';
        colorFunc = colors.red;
        consoleMethod = console.error;
        break;
      default:
        return;
    }
    const timestamp = colors.brightBlack(new Date().toISOString());
    const prefix = colors.blue(`[${this.prefix}]`);
    const level = colorFunc(`[${levelStr}]`);
    consoleMethod(`${timestamp} ${prefix} ${level} ${msg}`);
  }
}

module.exports = HolesailLogger;