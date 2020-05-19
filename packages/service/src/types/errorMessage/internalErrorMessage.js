const InternalErrorMessage = {
  ACCESS_TOKEN_EXPIRED: 'Access token expired',
  ACCESS_TOKEN_NOT_PROVIDED: 'Access token not provided',
  ACCESS_TOKEN_READ_ISSUE: 'There was an issue reading the access token',
  AUTH_ACCESS_TOKEN_REFRESH_FAILURE:
    'Failed to refresh access token. Refresh token invalid',
  AUTH_PASSWORD_RESET_TOKEN_EXPIRED: 'Password reset token expired',
  AUTH_PASSWORD_RESET_TOKEN_NOT_FOUND: 'Password reset token not found',
  AUTH_REFRESH_TOKEN_COOKIE_NOT_FOUND: 'Refresh token cookie was not provided',
  AUTH_REFRESH_TOKEN_DECRYPT_FAILED: 'Refresh token is invalid',
  AUTH_REFRESH_TOKEN_VERSION_MISMATCH: 'Refresh token version mismatch',
  CAPTCHA_ERROR: 'Captcha token is invalid',
  DATABASE_REQUEST_FAILED: 'Failed to make a request to the database',
  EMAIL_PASSWORD_RESET_SEND_FAILED: 'Failed to send password reset email',
  EMAIL_PASSWORD_RESET_SUCCESSFUL_SEND_FAILED:
    'Failed to send password reset success email',
  GENERIC: 'An unexpected error has ocurred',
  PASSWORD_MISMATCH: 'Provided password does not match',
  RATE_LIMIT_EXCEEDED: 'Too many requests in the allowable time frame',
  USER_DELETE_FAILED: 'Failed to delete user',
  USER_FETCH_FAILED: 'Failed to fetch user',
  USER_IS_DELETED: 'User is currently deleted',
  USER_NOT_FOUND: 'User not found',
  USER_PASSWORD_RESET_FAILED_TOKEN_MISMATCH:
    'Password reset token did not match expected',
  USER_REGISTER_FAILED: 'Failed to register user',
  USER_REGISTER_FAILED_ALREADY_EXISTS:
    'The given username and/or email already exists',
  USER_REVOKE_REFRESH_TOKENS_FAILED:
    'Could not revoke refresh tokens for the given user id',
  USER_SELF_DELETE_ATTEMPTED: 'User attempted to self delete',
  USER_SELF_FETCH_FAILED: 'Failed to retrieve logged in user info',
  USER_SELF_FETCH_FAILED_NO_USER_ON_CONTEXT:
    'No user was found on the request context',
  USER_SELF_UPDATE_FAILED: 'Failed to update self',
  USER_SELF_UPDATE_FAILED_EMAIL_IN_USE:
    'Failed to update self. Email is already in use.',
  USER_SELF_UPDATE_FAILED_NOT_FOUND:
    'Failed to update self. Could not locate user info.',
  USER_SELF_UPDATE_FAILED_SECURITY: 'Failed to update self security',
  USERS_FETCH_FAILED: 'Failed to fetch users',
};

export { InternalErrorMessage };
