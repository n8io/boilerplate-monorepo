const Component = {
  HAS_PERMISSION: 'HAS_PERMISSION',
  RATE_LIMITER: 'RATE_LIMITER',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  USER_DELETE: 'USER_DELETE',
  USER_LOGIN: 'USER_LOGIN',
  USER_PASSWORD_RESET: 'USER_PASSWORD_RESET',
  USER_PASSWORD_RESET_REQUEST: 'USER_PASSWORD_RESET_REQUEST',
  USER_PASSWORD_RESET_TOKEN_VALIDATE: 'USER_PASSWORD_RESET_TOKEN_VALIDATE',
  USER_RECOVERY_FIND: 'USER_RECOVERY_FIND',
  USER_REGISTER: 'USER_REGISTER',
  USER_REVOKE_REFRESH_TOKENS: 'USER_REVOKE_REFRESH_TOKENS',
  USER_SELF: 'USER_SELF',
  USER_SELF_SECURITY_UPDATE: 'USER_SELF_SECURITY_UPDATE',
  USER_SELF_UPDATE: 'USER_SELF_UPDATE',
  USERS: 'USERS',
};

const Module = {
  AUTH: 'AUTH',
  DIRECTIVE: 'DIRECTIVE',
  RESOLVER: 'RESOLVER',
  UNCATEGORIZED: 'UNCATEGORIZED',
};

const Tag = {
  COMPONENT: 'COMPONENT',
  MODULE: 'MODULE',
};

export { Component, Module, Tag };
