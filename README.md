# Holesail Logger

A lightweight, colorful logging utility for Node.js applications. It provides timestamped logs with customizable prefixes and color-coded levels (INFO, WARN, ERROR). Logging can be enabled or disabled globally.

## Installation

Install the package via npm:

```bash
npm install holesail-logger
```

## Usage

Import the `HolesailLogger` class and create an instance. By default, logging is disabled (`enabled: false`) and uses the prefix `'Holesail'`.

### Basic Example

```javascript
const HolesailLogger = require('holesail-logger');

const logger = new HolesailLogger({ enabled: true });

logger.log('This is an info message.');
logger.warn('This is a warning message.');
logger.error('This is an error message.');
```

### Output

The console output will look something like this (with colors applied):

```
2025-07-31T12:34:56.789Z [Holesail] [INFO] This is an info message.
2025-07-31T12:34:56.789Z [Holesail] [WARN] This is a warning message.
2025-07-31T12:34:56.789Z [Holesail] [ERROR] This is an error message.
```

- Timestamps are in ISO format and gray.
- Prefix is blue.
- Levels are green (INFO), yellow (WARN), red (ERROR).

### Customization

You can customize the logger during instantiation:

```javascript
const logger = new HolesailLogger({
  prefix: 'MyApp',    // Custom prefix (default: 'Holesail')
  enabled: true       // Enable logging (default: false)
});
```

## Methods

- `log(msg)`: Logs an INFO level message.
- `warn(msg)`: Logs a WARN level message.
- `error(msg)`: Logs an ERROR level message.

All methods check the `enabled` flag before outputting anything.

## Requirements

- Node.js >= 14 (uses ANSI escape codes for colors, which are supported in most terminals).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/holesail/holesail-logger).

## Contact

For questions or support, open an issue on the [GitHub repository](https://github.com/holesail/holesail-logger).