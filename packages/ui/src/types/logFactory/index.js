import debug from 'debug';

// eslint-disable-next-line no-process-env
const { npm_package_name: PACKAGE_NAME } = process.env;
const logs = {};

const makeNamespace = ({ method, module }) =>
  `${PACKAGE_NAME}/${module}.${method}`;

const logFactory = options => {
  const namespace = makeNamespace(options);

  if (logs[namespace]) {
    return logs[namespace];
  }

  const log = debug(namespace);

  logs[namespace] = log;

  return log;
};

export { logFactory };
