import 'dotenv/config';
import { defaultTo, evolve, pick } from 'ramda';
import { ProcessEnvKeys } from 'types/processEnv';

// eslint-disable-next-line no-process-env
const raw = pick(ProcessEnvKeys.values, process.env);

const [rootPackageName] = raw.npm_package_name
  .split('/')
  .map(part => part.replace('@', ''))
  .filter(Boolean);

const ACCESS_TOKEN_SECRET = 'auth-token-secret';
const ACCESS_TOKEN_EXPIRY = '5m';
const CAPTCHA_SECRET = '0x0000000000000000000000000000000000000000';
const DATABASE_URL = `postgres://postgres:postgres@localhost:5432/${rootPackageName}`;
const DB_MIGRATION_SCHEMA = 'public';
const DB_SCHEMA = 'main';
const DEBUG = `${raw.npm_package_name}*`;
const ENGINE_API_KEY = '';
const ENGINE_SCHEMA_TAG = 'local';
const HTTPS = true;
const PASSWORD_RESET_EMAIL_FROM_ADDRESS = `noreply@example.com`;
const PASSWORD_RESET_EMAIL_FROM_NAME = 'No Reply';
const PORT = 4000;
const REDIS_URL = '';
const REFRESH_TOKEN_SECRET = 'refresh-token-secret';
const REFRESH_TOKEN_EXPIRY = '7d';
const SMTP_CONNECTION = 'smtp://user:password@localhost:1025';
const UI_HOST_URI = 'https://local.host:3000';
const NODE_ENV = 'development';

const config = evolve(
  {
    ACCESS_TOKEN_EXPIRY: defaultTo(ACCESS_TOKEN_EXPIRY),
    ACCESS_TOKEN_SECRET: defaultTo(ACCESS_TOKEN_SECRET),
    CAPTCHA_SECRET: defaultTo(CAPTCHA_SECRET),
    DATABASE_URL: defaultTo(DATABASE_URL),
    DB_MIGRATION_SCHEMA: defaultTo(DB_MIGRATION_SCHEMA),
    DB_SCHEMA: defaultTo(DB_SCHEMA),
    DEBUG: defaultTo(DEBUG),
    ENGINE_API_KEY: defaultTo(ENGINE_API_KEY),
    ENGINE_SCHEMA_TAG: defaultTo(ENGINE_SCHEMA_TAG),
    HTTPS: defaultTo(HTTPS),
    NODE_ENV: defaultTo(NODE_ENV),
    PASSWORD_RESET_EMAIL_FROM_ADDRESS: defaultTo(
      PASSWORD_RESET_EMAIL_FROM_ADDRESS
    ),
    PASSWORD_RESET_EMAIL_FROM_NAME: defaultTo(PASSWORD_RESET_EMAIL_FROM_NAME),
    PORT: defaultTo(PORT),
    REDIS_URL: defaultTo(REDIS_URL),
    REFRESH_TOKEN_EXPIRY: defaultTo(REFRESH_TOKEN_EXPIRY),
    REFRESH_TOKEN_SECRET: defaultTo(REFRESH_TOKEN_SECRET),
    SMTP_CONNECTION: defaultTo(SMTP_CONNECTION),
    UI_HOST_URI: defaultTo(UI_HOST_URI),
  },
  raw
);

export { config };
