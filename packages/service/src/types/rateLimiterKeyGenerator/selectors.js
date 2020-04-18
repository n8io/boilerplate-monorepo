import { defaultKeyGenerator } from 'graphql-rate-limit-directive';
import { pathOr } from 'ramda';

const toKey = (uniqueId, { args, context, directiveArgs, info, obj }) =>
  `${uniqueId}:${defaultKeyGenerator(directiveArgs, obj, args, context, info)}`;

// eslint-disable-next-line max-params
const ip = (directiveArgs, obj, args, context, info) => {
  const { ip: uniqueId } = context;

  return toKey(uniqueId, { args, context, directiveArgs, info, obj });
};

// eslint-disable-next-line max-params
const username = (directiveArgs, obj, args, context, info) => {
  const uniqueId = pathOr('username', ['input', 'username'], args);

  return toKey(uniqueId, { args, context, directiveArgs, info, obj });
};

export { ip, username };
