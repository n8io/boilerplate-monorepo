enum LogLevel {
  ERROR = 'error',
  INFO = 'info',
  WARN = 'warn',
}

const prefix = {
  [LogLevel.ERROR]: '🛑',
  [LogLevel.INFO]: 'ℹ️',
  [LogLevel.WARN]: '⚠',
};

const log = {
  error: (message: string, data?: any) => {
    const logLevel = LogLevel.ERROR;

    console[logLevel](`${prefix[logLevel]} ${message}`, data);
  },
  info: (message: string, data?: any) => {
    const logLevel = LogLevel.INFO;

    console[logLevel](`${prefix[logLevel]} ${message}`, data);
  },
  warn: (message: string, data?: any) => {
    const logLevel = LogLevel.WARN;

    console[logLevel](`${prefix[logLevel]} ${message}`, data);
  },
};

export { LogLevel, log };
