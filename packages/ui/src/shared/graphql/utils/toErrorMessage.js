import { ApolloError } from '@apollo/client';
import { isNullOrEmpty } from '@boilerplate-monorepo/common/src/utils/isNullOrEmpty';

const toExtensionCode = (errors = []) => errors[0]?.extensions?.code;
const parseError = error => error?.message;

const parseApolloError = ({ graphQLErrors }) => {
  if (!isNullOrEmpty(graphQLErrors)) {
    const code = toExtensionCode(graphQLErrors);

    return code || 'INTERNAL_SERVER_ERROR';
  }

  return 'GENERIC_NETWORK_ERROR';
};

const toErrorMessage = (t, error) => {
  if (error instanceof ApolloError) return t(parseApolloError(error));

  return parseError(error);
};

export { toErrorMessage };
