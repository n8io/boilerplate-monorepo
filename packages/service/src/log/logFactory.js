/**
 * This log utility is used to conditionally log debug messages based upon the
 * `DEBUG` environment variable. If you want to add "always-on" logging please
 * use the `./log`.
 */

import { config } from 'config';
import debug from 'debug';
import { toSafeLog } from './toSafeLog';

const { DEBUG, isTest, name: PACKAGE_NAME } = config;
const logs = {};

debug.enable(DEBUG);

const makeNamespace = ({ method, module }) =>
  `${PACKAGE_NAME}/${module}.${method}`;

const monkeyPatchTimestamp = (logFn) => (message, ...args) =>
  args.length
    ? logFn(`${new Date().toISOString()}: ${message}`, toSafeLog(...args))
    : logFn(`${new Date().toISOString()}: ${message}`);

const logFactory = (options) => {
  const namespace = makeNamespace(options);

  if (isTest) return () => null;
  if (logs[namespace]) return logs[namespace];

  const log = monkeyPatchTimestamp(debug(namespace));

  logs[namespace] = log;

  return log;
};

export { logFactory };
