const test = require('brittle')
const HolesailLogger = require('./index.js')

function mockConsole() {
  const logs = {
    log: [],
    warn: [],
    error: []
  }

  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error
  }

  console.log = (...args) => logs.log.push(args.join(' '))
  console.warn = (...args) => logs.warn.push(args.join(' '))
  console.error = (...args) => logs.error.push(args.join(' '))

  return {
    logs,
    restore() {
      console.log = original.log
      console.warn = original.warn
      console.error = original.error
    }
  }
}

test('info logs when level allows', (t) => {
  const { logs, restore } = mockConsole()

  const logger = new HolesailLogger({ prefix: 'TEST', level: 1 })
  logger.info('hello %s', 'world')

  t.is(logs.log.length, 1)
  t.ok(logs.log[0].includes('[TEST]'))
  t.ok(logs.log[0].includes('[INFO]'))
  t.ok(logs.log[0].includes('hello world'))

  restore()
})

test('debug does not log when level is INFO', (t) => {
  const { logs, restore } = mockConsole()

  const logger = new HolesailLogger({ level: 1 })
  logger.debug('hidden')

  t.is(logs.log.length, 0)

  restore()
})

test('debug logs when level is DEBUG', (t) => {
  const { logs, restore } = mockConsole()

  const logger = new HolesailLogger({ level: 0 })
  logger.debug('visible')

  t.is(logs.log.length, 1)
  t.ok(logs.log[0].includes('[DEBUG]'))

  restore()
})

test('warn uses console.warn', (t) => {
  const { logs, restore } = mockConsole()

  const logger = new HolesailLogger({ level: 0 })
  logger.warn('warn message')

  t.is(logs.warn.length, 1)
  t.ok(logs.warn[0].includes('[WARN]'))

  restore()
})

test('error uses console.error', (t) => {
  const { logs, restore } = mockConsole()

  const logger = new HolesailLogger({ level: 0 })
  logger.error('boom')

  t.is(logs.error.length, 1)
  t.ok(logs.error[0].includes('[ERROR]'))

  restore()
})

test('disabled logger does not log', (t) => {
  const { logs, restore } = mockConsole()

  const logger = new HolesailLogger({ level: 0 })
  logger.enabled = false

  logger.info('nope')
  logger.error('nope')

  t.is(logs.log.length, 0)
  t.is(logs.error.length, 0)

  restore()
})

test('prefix is applied correctly', (t) => {
  const { logs, restore } = mockConsole()

  const logger = new HolesailLogger({ prefix: 'MYAPP', level: 0 })
  logger.info('check prefix')

  t.ok(logs.log[0].includes('[MYAPP]'))

  restore()
})

test('invalid level type does nothing', (t) => {
  const { logs, restore } = mockConsole()

  const logger = new HolesailLogger({ level: 0 })

  logger._emit(999, '???')

  t.is(logs.log.length, 0)
  t.is(logs.warn.length, 0)
  t.is(logs.error.length, 0)

  restore()
})
