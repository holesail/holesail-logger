# Holesail Logger

A lightweight, colorful logging utility for Node.js applications. It provides timestamped logs with customizable prefixes and color-coded levels (DEBUG, INFO, WARN, ERROR). Logging can be enabled or disabled globally, and a minimum log level can be set to control verbosity.

## Installation

Install the package via npm:

```bash
npm install holesail-logger
```

## Usage

Import the `HolesailLogger` class and create an instance. By default, logging is disabled (`enabled: false`), uses the prefix `'Holesail'`, and the minimum log level is `1` (INFO).

### Basic Example

```javascript
const HolesailLogger = require('holesail-logger');

const logger = new HolesailLogger({ enabled: true });

logger.log({ type: 0, msg: 'This is a debug message.' });
logger.log({ type: 1, msg: 'This is an info message.' });
logger.log({ type: 2, msg: 'This is a warning message.' });
logger.log({ type: 3, msg: 'This is an error message.' });
```

### Output

The console output will look something like this (with colors applied):

```
2025-07-31T12:34:56.789Z [Holesail] [DEBUG] This is a debug message.
2025-07-31T12:34:56.789Z [Holesail] [INFO] This is an info message.
2025-07-31T12:34:56.789Z [Holesail] [WARN] This is a warning message.
2025-07-31T12:34:56.789Z [Holesail] [ERROR] This is an error message.
```

- Timestamps are in ISO format and bright black (gray).
- Prefix is blue.
- Levels are bright black (DEBUG), green (INFO), yellow (WARN), red (ERROR).

### Customization

You can customize the logger during instantiation:

```javascript
const logger = new HolesailLogger({
  prefix: 'MyApp',    // Custom prefix (default: 'Holesail')
  enabled: true,      // Enable logging (default: false)
  level: 0            // Minimum log level (default: 1, which is INFO; 0 for DEBUG and above)
});
```

The log levels are defined as:
- `DEBUG: 0`
- `INFO: 1`
- `WARN: 2`
- `ERROR: 3`

Logs with a type below the `minLevel` will be ignored.

## Methods

- `log({ type, msg })`: Logs a message at the specified level. The `type` must be one of the `LOG_LEVELS` values. This method checks the `enabled` flag and `minLevel` before outputting anything.

## Requirements

- Node.js >= 14 (uses ANSI escape codes for colors, which are supported in most terminals).
- Depends on `barely-colours` for color formatting.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/holesail/holesail-logger).

## Contact

For questions or support, open an issue on the [GitHub repository](https://github.com/holesail/holesail-logger).