const InternalErrorMessage = {
  ACCESS_TOKEN_EXPIRED: 'Access token expired',
  ACCESS_TOKEN_NOT_PROVIDED: 'Access token not provided',
  ACCESS_TOKEN_READ_ISSUE: 'There was an issue reading the access token',
  FAILED_DB_REQUEST: 'Failed to make a request to the database',
  FAILED_TO_DECRYPT_REFRESH_TOKEN: 'Refresh token is invalid',
  FAILED_TO_DELETE_USER: 'Failed to delete user',
  FAILED_TO_FETCH_USERS: 'Failed to fetch users',
  FAILED_TO_REFRESH_ACCESS_TOKEN:
    'Failed to refresh access token. Refresh token invalid',
  FAILED_TO_REGISTER_USER: 'Failed to register user',
  FAILED_TO_REGISTER_USER_ALREADY_EXISTS:
    'The given username and/or email already exists',
  FAILED_TO_RETRIEVE_SELF: 'Failed to retrieve logged in user info',
  FAILED_TO_RETRIEVE_SELF_NO_USER_ON_CONTEXT:
    'No user was found on the request context',
  FAILED_TO_RETRIEVE_USERS: 'Failed to retrieve users',
  FAILED_TO_REVOKE_REFRESH_TOKENS:
    'Could not revoke refresh tokens for the given user id',
  FAILED_TO_UPDATE_SELF: 'Failed to update self',
  FAILED_TO_UPDATE_SELF_NOT_FOUND:
    'Failed to update self. Could not locate user info.',
  FAILED_TO_UPDATE_SELF_SECURITY: 'Failed to update self security',
  GENERIC: 'A general error has ocurred',
  PASSWORD_MISMATCH: 'Provided password does not match',
  RATE_LIMIT_EXCEEDED: 'Too many requests in the allowable time frame',
  REFRESH_TOKEN_COOKIE_NOT_FOUND: 'Refresh token cookie was not provided',
  REFRESH_TOKEN_VERSION_MISMATCH: 'Refresh token version mismatch',
  USER_ATTEMPTED_TO_SELF_DELETE: 'User attempted to self delete',
  USER_IS_DELETED: 'User is currently deleted',
  USER_NOT_FOUND: 'User not found',
};

export { InternalErrorMessage };
