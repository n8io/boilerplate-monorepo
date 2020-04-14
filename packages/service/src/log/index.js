import { LogLevel } from '@boilerplate-monorepo/common';
import { toSafeLog } from './toSafeLog';

const prefix = {
  [LogLevel.ERROR]: '🛑',
  [LogLevel.INFO]: 'ℹ️',
  [LogLevel.WARN]: '⚠️',
};

const prependInfo = logLevel =>
  `${new Date().toISOString()}: ${prefix[logLevel]}`;

const printMessage = ({ data, logLevel, message }) => {
  /* eslint-disable no-console */
  if (data) {
    return console[logLevel.toLowerCase()](
      `${prependInfo(logLevel)} ${message}`,
      toSafeLog(data)
    );
  }

  return console[logLevel.toLowerCase()](`${prependInfo(logLevel)} ${message}`);
  /* eslint-enable no-console */
};

const log = {
  [LogLevel.ERROR.toLowerCase()]: (message, data) => {
    const logLevel = LogLevel.ERROR;

    return printMessage({ data, logLevel, message });
  },
  [LogLevel.INFO.toLowerCase()]: (message, data) => {
    const logLevel = LogLevel.INFO;

    return printMessage({ data, logLevel, message });
  },
  [LogLevel.WARN.toLowerCase()]: (message, data) => {
    const logLevel = LogLevel.WARN;

    return printMessage({ data, logLevel, message });
  },
};

export { log };
