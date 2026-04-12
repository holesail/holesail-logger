# holesail-logger

Simple logger for Node.js with level filtering and prefix support.

## Usage

```js
const HolesailLogger = require('holesail-logger')

const log = new HolesailLogger({ prefix: 'MYAPP', level: 1 })

log.info('started %s', 'server')
log.warn('something off')
log.error('boom')
```

## API

#### `const log = new HolesailLogger([options])`

Create a new logger.

Options:

- `prefix` - string prepended to every log line. default: LOG
- `level` - minimum log level. `0` = DEBUG, `1` = INFO, `2` = WARN, `3` = ERROR. default: `1`
- `enabled` - set to `false` to silence all output. default: `true`

#### `log.debug(msg, [...args])`

Log at DEBUG level. Only emits if `level` is `0`.

#### `log.info(msg, [...args])`

Log at INFO level. Only emits if `level` is `0` or `1`.

#### `log.warn(msg, [...args])`

Log at WARN level. Always emits when enabled.

#### `log.error(msg, [...args])`

Log at ERROR level. Always emits when enabled.

#### `log.enabled`

Set to `false` to disable all logging at runtime.

## License

Apache-2.0
