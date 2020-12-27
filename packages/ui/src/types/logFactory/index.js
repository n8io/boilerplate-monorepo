import { config } from 'config';
import debug from 'debug';

const { npm_package_name: PACKAGE_NAME } = config;
const logs = {};

const makeNamespace = ({ method, module }) =>
  `${PACKAGE_NAME}/${module}.${method}`;

const logFactory = (options) => {
  const namespace = makeNamespace(options);

  if (logs[namespace]) {
    return logs[namespace];
  }

  const log = debug(namespace);

  logs[namespace] = log;

  return log;
};

export { logFactory };
