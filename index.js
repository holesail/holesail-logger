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

  debug (msg) {
    if (this.enabled && this.LOG_LEVELS.DEBUG >= this.minLevel) {
      const timestamp = `${this.colors.gray}${new Date().toISOString()}${this.colors.reset}`
      const prefix = `${this.colors.blue}[${this.prefix}]${this.colors.reset}`
      const level = `${this.colors.gray}[DEBUG]${this.colors.reset}`
      console.log(`${timestamp} ${prefix} ${level} ${msg}`)
    }
  }

  log (msg) {
    if (this.enabled && this.LOG_LEVELS.INFO >= this.minLevel) {
      const timestamp = `${this.colors.gray}${new Date().toISOString()}${this.colors.reset}`
      const prefix = `${this.colors.blue}[${this.prefix}]${this.colors.reset}`
      const level = `${this.colors.green}[INFO]${this.colors.reset}`
      console.log(`${timestamp} ${prefix} ${level} ${msg}`)
    }
  }

  warn (msg) {
    if (this.enabled && this.LOG_LEVELS.WARN >= this.minLevel) {
      const timestamp = `${this.colors.gray}${new Date().toISOString()}${this.colors.reset}`
      const prefix = `${this.colors.blue}[${this.prefix}]${this.colors.reset}`
      const level = `${this.colors.yellow}[WARN]${this.colors.reset}`
      console.warn(`${timestamp} ${prefix} ${level} ${msg}`)
    }
  }

  error (msg) {
    if (this.enabled && this.LOG_LEVELS.ERROR >= this.minLevel) {
      const timestamp = `${this.colors.gray}${new Date().toISOString()}${this.colors.reset}`
      const prefix = `${this.colors.blue}[${this.prefix}]${this.colors.reset}`
      const level = `${this.colors.red}[ERROR]${this.colors.reset}`
      console.error(`${timestamp} ${prefix} ${level} ${msg}`)
    }
  }
}

module.exports = HolesailLogger
