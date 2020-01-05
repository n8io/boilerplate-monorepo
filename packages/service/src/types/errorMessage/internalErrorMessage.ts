enum InternalErrorMessage {
  ACCESS_TOKEN_EXPIRED = 'Access token expired',
  ACCESS_TOKEN_NOT_PROVIDED = 'Access token not provided',
  FAILED_DB_REQUEST = 'Failed to make a request to the database',
  FAILED_TO_DECRYPT_REFRESH_TOKEN = 'Refresh token is invalid',
  FAILED_TO_DELETE_USER = 'Failed to delete user',
  FAILED_TO_REFRESH_ACCESS_TOKEN = 'Failed to refresh access token. Refresh token invalid',
  FAILED_TO_REGISTER_USER = 'Failed to register user',
  FAILED_TO_REGISTER_USER_ALREADY_EXISTS = 'The given username and/or email already exists',
  FAILED_TO_RETRIEVE_USERS = 'Failed to retrieve users',
  FAILED_TO_REVOKE_REFRESH_TOKENS = 'Could not revoke refresh tokens for the given user id',
  GENERIC = 'A general error has occured',
  PASSWORD_MISMATCH = 'Provided password does not match',
  REFRESH_TOKEN_COOKIE_NOT_FOUND = 'Refresh token cookie was not provided',
  REFRESH_TOKEN_VERSION_MISMATCH = 'Refresh token version mismatch',
  USER_ATTEMPTED_TO_SELF_DELETE = 'User attempted to self delete',
  USER_NOT_FOUND = 'User does not exist',
}

export { InternalErrorMessage };
