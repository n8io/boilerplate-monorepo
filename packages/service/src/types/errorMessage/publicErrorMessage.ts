enum PublicErrorMessage {
  CANNOT_DELETE_SELF = 'Cannot delete self',
  FAILED_TO_DELETE_USER = 'Unable to delete user',
  FAILED_TO_REVOKE_REFRESH_TOKENS = 'Unable to revoke refresh tokens',
  FAILED_TO_REGISTER_USER = 'Unable to register user',
  FAILED_TO_RETRIEVE_SELF = 'Unable to find self info',
  DATABASE_ERROR_OCCURRED = 'A database error occurred',
  INVALID_LOGIN = 'Invalid login',
  UNAUTHORIZED = 'Not authorized',
}

export { PublicErrorMessage };
