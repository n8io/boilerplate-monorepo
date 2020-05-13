const Component = {
  FORMAT_ERROR: 'formatError',
  HAS_PERMISSION: 'hasPermission',
  IS_AUTHENTICATED: 'isAuthenticated',
  RATE_LIMITER: 'rateLimiter',
  REFRESH_TOKEN: 'refreshToken',
  USER_DELETE: 'userDelete',
  USER_LOGIN: 'userLogin',
  USER_PASSWORD_RESET: 'userPasswordReset',
  USER_PASSWORD_RESET_REQUEST: 'userPasswordResetRequest',
  USER_PASSWORD_RESET_TOKEN_VALIDATE: 'userPasswordResetTokenValidate',
  USER_RECOVERY_FIND: 'userRecoveryFind',
  USER_REGISTER: 'userRegister',
  USER_REVOKE_REFRESH_TOKENS: 'userRevokeRefreshTokens',
  USER_SELF: 'userSelf',
  USER_SELF_SECURITY_UPDATE: 'userSelfSecurityUpdate',
  USER_SELF_UPDATE: 'userSelfUpdate',
  USERS: 'users',
};

const Module = {
  AUTH: 'auth',
  DIRECTIVE: 'directive',
  GRAPHQL: 'graphql',
  RESOLVER: 'resolver',
  UNCATEGORIZED: 'uncategorized',
};

const Source = {
  SERVICE: 'service',
};

const Tag = {
  COMPONENT: 'component',
  MODULE: 'module',
  SOURCE: 'source',
};

export { Component, Module, Source, Tag };
