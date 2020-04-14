import debug from 'debug';
import { toSafeLog } from './toSafeLog';

// eslint-disable-next-line no-process-env
const { npm_package_name: PACKAGE_NAME } = process.env;
const logs = {};

const makeNamespace = ({ method, module }) =>
  `${PACKAGE_NAME}/${module}.${method}`;

const monkeyPatchTimestamp = logFn => (message, ...args) =>
  args.length
    ? logFn(`${new Date().toISOString()}: ${message}`, toSafeLog(...args))
    : logFn(`${new Date().toISOString()}: ${message}`);

const logFactory = options => {
  const namespace = makeNamespace(options);

  if (logs[namespace]) {
    return logs[namespace];
  }

  const log = monkeyPatchTimestamp(debug(namespace));

  logs[namespace] = log;

  return log;
};

export { logFactory };
