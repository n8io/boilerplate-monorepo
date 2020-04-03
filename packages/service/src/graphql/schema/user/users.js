import { Permission, Utils } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { usersRead } from 'db/user/usersRead';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { join, pick, pipe, take, unless, values } from 'ramda';
import { DatabaseError } from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Pagination } from 'types/pagination';

const MUTATION_NAME = 'users';

const debugLog = logFactory({
  method: 'users',
  module: 'resolvers/user',
});

const toUserCursor = unless(
  Utils.isNullOrEmpty,
  pipe(
    pick(['familyName', 'givenName', 'id']),
    values,
    join(Pagination.DELIMITER)
  )
);

const resolver = async (_parent, { input }, context) => {
  debugLog('👾 Users', input);

  let users = [];
  let pagination = null;

  try {
    ({ pagination, users } = await usersRead(input, context));
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_FETCH_USERS, {
      error,
      input,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  debugLog(`✅ Successfully fetched ${users.length} user(s)`, take(5, users));

  return Pagination.nodesToPaginatedResults(users, pagination, toUserCursor);
};

const typeDefs = gql`
  "A User edge"
  type UserEdge {
    cursor: String!
    node: UserSnapshot!
  }

  "A page info"
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    total: Int!
  }

  "A page of users"
  type UsersPage {
    edges: [UserEdge!]!
    pageInfo: PageInfo!
  }

  "The input type for paged results"
  input PaginationInput {
    after: String
    first: Int
  }

  type Query {
    "Fetch a page of users"
    users(input: PaginationInput!): UsersPage!
      @hasPermission(permission: "${Permission.USERS_MANAGE}")
      @isAuthenticated
  }
`;

export { resolver, typeDefs };
