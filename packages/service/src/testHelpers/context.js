import { User, Utils } from '@boilerplate-monorepo/common';

const stubLoader = name => ({
  clear: td.func(`${name}.clear`),
  load: td.func(`${name}.load`),
});

const db = {
  user: {
    read: jest.fn().mockName('read'),
    readRaw: jest.fn().mockName('readRaw'),
    recoveryFind: jest.fn().mockName('recoveryFind'),
    register: jest.fn().mockName('register'),
    revokeRefreshTokens: jest.fn().mockName('revokeRefreshTokens'),
    save: jest.fn().mockName('save'),
  },
  users: {
    read: jest.fn().mockName('read'),
    readPaginated: jest.fn().mockName('readPaginated'),
    readRaw: jest.fn().mockName('readRaw'),
  },
};

const make = Utils.makeSafeExample({
  db,
  ip: '127.0.0.1',
  loaders: {
    user: stubLoader('user'),
  },
  req: {
    headers: {},
    ip: '127.0.0.1',
  },
  res: {
    cookie: jest.fn().mockName('cookie'),
  },
  user: User.apiExample(),
});

export { make };
