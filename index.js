class HolesailLogger {
  constructor ({ prefix = 'Holesail', enabled = false, level = 1 } = {}) {
    this.prefix = prefix
    this.enabled = enabled
    this.minLevel = level
    this.LOG_LEVELS = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3
    }
    this.colors = {
      reset: '\x1b[0m',
      gray: '\x1b[90m',
      blue: '\x1b[34m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      red: '\x1b[31m'
    }
  }

  log ({ type, msg }) {
    if (!this.enabled || type < this.minLevel) return
    let levelStr, color, consoleMethod
    switch (type) {
      case this.LOG_LEVELS.DEBUG:
        levelStr = 'DEBUG'
        color = this.colors.gray
        consoleMethod = console.log
        break
      case this.LOG_LEVELS.INFO:
        levelStr = 'INFO'
        color = this.colors.green
        consoleMethod = console.log
        break
      case this.LOG_LEVELS.WARN:
        levelStr = 'WARN'
        color = this.colors.yellow
        consoleMethod = console.warn
        break
      case this.LOG_LEVELS.ERROR:
        levelStr = 'ERROR'
        color = this.colors.red
        consoleMethod = console.error
        break
      default:
        return
    }
    const timestamp = `${this.colors.gray}${new Date().toISOString()}${this.colors.reset}`
    const prefix = `${this.colors.blue}[${this.prefix}]${this.colors.reset}`
    const level = `${color}[${levelStr}]${this.colors.reset}`
    consoleMethod(`${timestamp} ${prefix} ${level} ${msg}`)
  }
}

module.exports = HolesailLogger