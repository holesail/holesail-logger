const colors = require('barely-colours')
const util = require('util')
const LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
}

class HolesailLogger {
  constructor({ prefix = 'LOG', level = 1 } = {}) {
    this.prefix = prefix
    this.level = level
    this._enabled = true
  }

  get enabled() {
    return this._enabled
  }

  set enabled(bool) {
    this._enabled = bool
  }

  _emit(type, msg) {
    if (!this._enabled || type < this.level) return
    let string, color, consoleMethod
    switch (type) {
      case LEVELS.DEBUG:
        string = 'DEBUG'
        color = colors.brightBlack
        consoleMethod = console.log
        break
      case LEVELS.INFO:
        string = 'INFO'
        color = colors.green
        consoleMethod = console.log
        break
      case LEVELS.WARN:
        string = 'WARN'
        color = colors.yellow
        consoleMethod = console.warn
        break
      case LEVELS.ERROR:
        string = 'ERROR'
        color = colors.red
        consoleMethod = console.error
        break
      default:
        return
    }
    const timestamp = colors.brightBlack(new Date().toISOString())
    const prefix = colors.blue(`[${this.prefix}]`)
    const level = color(`[${string}]`)
    consoleMethod(`${timestamp} ${prefix} ${level} ${msg}`)
  }

  debug(...args) {
    this._emit(LEVELS.DEBUG, util.format(...args))
  }

  info(...args) {
    this._emit(LEVELS.INFO, util.format(...args))
  }

  warn(...args) {
    this._emit(LEVELS.WARN, util.format(...args))
  }

  error(...args) {
    this._emit(LEVELS.ERROR, util.format(...args))
  }
}

module.exports = HolesailLogger
