const prefix = {
  error: '🛑',
  info: 'ℹ️',
  log: '✅',
  warn: '⚠',
};

const prependInfo = logLevel =>
  `${new Date().toISOString()}: ${prefix[logLevel]}`;

const printMessage = ({ data, logLevel: tmpLogLevel, message }) => {
  const logLevel = tmpLogLevel.toLowerCase();

  /* eslint-disable no-console */
  if (data) {
    return console[logLevel](`${prependInfo(logLevel)} ${message}`, data);
  }

  return console[logLevel](`${prependInfo(logLevel)} ${message}`);
  /* eslint-enable no-console */
};

const log = {
  error: (message, data) => {
    const logLevel = 'error';

    return printMessage({ data, logLevel, message });
  },
  info: (message, data) => {
    const logLevel = 'info';

    return printMessage({ data, logLevel, message });
  },
  warn: (message, data) => {
    const logLevel = 'warn';

    return printMessage({ data, logLevel, message });
  },
};

export { log };
