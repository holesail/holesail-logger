'use strict'

const assert = require('assert')
const HolesailLogger = require('../index.js')

function captureConsole (fn) {
  const out = { log: [], warn: [], error: [] }
  const restore = {
    log: console.log,
    warn: console.warn,
    error: console.error
  }
  console.log = (msg) => out.log.push(String(msg))
  console.warn = (msg) => out.warn.push(String(msg))
  console.error = (msg) => out.error.push(String(msg))
  try {
    fn(out)
  } finally {
    Object.assign(console, restore)
  }
  return out
}

function runChecks () {
  const a = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 0, prefix: 'Test' })
    logger.debug('debug line')
    logger.info('info line')
    logger.warn('warn line')
    logger.error('error line')
  })
  assert.equal(a.log.length, 2, 'DEBUG+INFO should use console.log twice')
  assert.equal(a.warn.length, 1, 'WARN should use console.warn once')
  assert.equal(a.error.length, 1, 'ERROR should use console.error once')
  assert.ok(a.log[0].includes('[DEBUG]') && a.log[0].includes('debug line'))
  assert.ok(a.log[1].includes('[INFO]') && a.log[1].includes('info line'))
  assert.ok(a.warn[0].includes('[WARN]'))
  assert.ok(a.error[0].includes('[ERROR]'))

  // util.format-style args
  const b = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 1 })
    logger.info('hello %s %d', 'world', 42)
  })
  assert.ok(b.log[0].includes('hello world 42'), 'util.format should apply')

  // Legacy log({ type, msg })
  const c = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 1 })
    logger.log({ type: 2, msg: 'legacy warn' })
  })
  assert.equal(c.warn.length, 1)
  assert.ok(c.warn[0].includes('legacy warn'))

  // enabled: false → silence
  const d = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: false, level: 0 })
    logger.error('silent')
  })
  assert.equal(d.log.length + d.warn.length + d.error.length, 0)

  // minLevel: INFO (1) → no DEBUG
  const e = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 1 })
    logger.debug('skip')
    logger.info('keep')
  })
  assert.equal(e.log.length, 1)
  assert.ok(e.log[0].includes('[INFO]'))

  // Invalid type for log() → nothing
  const f = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 0 })
    logger.log({ type: 99, msg: 'nope' })
  })
  assert.equal(f.log.length + f.warn.length + f.error.length, 0)

  console.log('All automated checks passed.')
}

// Colored demo (eyeball timestamps, prefix, and colors)
function visualDemo () {
  console.log('\n--- Visual demo (real console) ---\n')
  const logger = new HolesailLogger({ enabled: true, level: 0, prefix: 'Demo' })
  logger.debug('debug')
  logger.info('info with %s', 'format')
  logger.warn('warn')
  logger.error('error')
  logger.log({ type: 1, msg: 'legacy info' })
  console.log('')
}

visualDemo()
runChecks()
