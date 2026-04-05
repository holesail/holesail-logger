import test from 'brittle'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
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

test('shorthand methods use the right console methods and labels', function (t) {
  const a = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 0, prefix: 'Test' })
    logger.debug('debug line')
    logger.info('info line')
    logger.warn('warn line')
    logger.error('error line')
  })
  t.is(a.log.length, 2, 'DEBUG+INFO should use console.log twice')
  t.is(a.warn.length, 1, 'WARN should use console.warn once')
  t.is(a.error.length, 1, 'ERROR should use console.error once')
  t.ok(a.log[0].includes('[DEBUG]') && a.log[0].includes('debug line'))
  t.ok(a.log[1].includes('[INFO]') && a.log[1].includes('info line'))
  t.ok(a.warn[0].includes('[WARN]'))
  t.ok(a.error[0].includes('[ERROR]'))
})

test('info passes arguments through util.format', function (t) {
  const b = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 1 })
    logger.info('hello %s %d', 'world', 42)
  })
  t.ok(b.log[0].includes('hello world 42'), 'util.format should apply')
})

test('legacy log({ type, msg }) still works', function (t) {
  const c = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 1 })
    logger.log({ type: 2, msg: 'legacy warn' })
  })
  t.is(c.warn.length, 1)
  t.ok(c.warn[0].includes('legacy warn'))
})

test('enabled: false produces no output', function (t) {
  const d = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: false, level: 0 })
    logger.error('silent')
  })
  t.is(d.log.length + d.warn.length + d.error.length, 0)
})

test('minLevel INFO skips DEBUG', function (t) {
  const e = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 1 })
    logger.debug('skip')
    logger.info('keep')
  })
  t.is(e.log.length, 1)
  t.ok(e.log[0].includes('[INFO]'))
})

test('invalid log type produces no output', function (t) {
  const f = captureConsole(() => {
    const logger = new HolesailLogger({ enabled: true, level: 0 })
    logger.log({ type: 99, msg: 'nope' })
  })
  t.is(f.log.length + f.warn.length + f.error.length, 0)
})
