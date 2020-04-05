import { defaultKeyGenerator } from 'graphql-rate-limit-directive';
import { log } from 'log';
import { omit, prop } from 'ramda';
import { RateLimitError } from '../customError';

const toSafeError = omit([
  'clearTextPassword',
  'password',
  'passwordHash',
  'password_hash',
]);

// eslint-disable-next-line max-params
const ipKeyGenerator = (directiveArgs, obj, args, context, info) => {
  const { ip } = context;

  return `${ip}:${defaultKeyGenerator(
    directiveArgs,
    obj,
    args,
    context,
    info
  )}`;
};

// eslint-disable-next-line max-params
const onLimit = (resource, _directiveArgs, _obj, args, context, info) => {
  const { ip } = context;
  const { fieldName: query } = info;
  const input = prop('input', args);

  log.error(
    `Rate limit exceeded for ${query} at ${ip}. Try again in ${Math.ceil(
      resource.msBeforeNext / 1000
    )} second(s).`,
    toSafeError(input)
  );

  throw new RateLimitError(resource.msBeforeNext);
};

export { ipKeyGenerator, onLimit };
