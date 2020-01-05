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

const prefixer = (logLevel: LogLevel) =>
  `${new Date().toISOString()}: ${prefix[logLevel]}`;

const printMessage = ({
  data,
  logLevel,
  message,
}: {
  data?: any;
  logLevel: LogLevel;
  message: string;
}) => {
  if (data) {
    return console[logLevel](`${prefixer(logLevel)} ${message}`, data);
  }

  return console[logLevel](`${prefixer(logLevel)} ${message}`);
};

const log = {
  error: (message: string, data?: any) => {
    const logLevel = LogLevel.ERROR;

    return printMessage({ data, logLevel, message });
  },
  info: (message: string, data?: any) => {
    const logLevel = LogLevel.INFO;

    return printMessage({ data, logLevel, message });
  },
  warn: (message: string, data?: any) => {
    const logLevel = LogLevel.WARN;

    return printMessage({ data, logLevel, message });
  },
};

export { LogLevel, log };
