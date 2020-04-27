import { Permission, UserSnapshot, Utils } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { join, pick, pipe, take, unless, values } from 'ramda';
import { DatabaseError } from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Pagination } from 'types/pagination';

const QUERY_NAME = 'users';

const debugLog = logFactory({
  method: QUERY_NAME,
  module: 'resolvers/users',
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
  debugLog(`👾 ${QUERY_NAME}`, input);

  const { db } = context;

  let users = [];
  let pagination = null;

  try {
    ({ pagination, users } = await db.users.readPaginated(input));
  } catch (error) {
    log.error(InternalErrorMessage.USERS_FETCH_FAILED, {
      error,
      input,
      query: QUERY_NAME,
    });

    throw new DatabaseError();
  }

  debugLog(`✅ Successfully fetched ${users.length} user(s)`, take(5, users));

  return Pagination.nodesToPaginatedResults(
    users.map(UserSnapshot.make),
    pagination,
    toUserCursor
  );
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
    ${QUERY_NAME}(input: PaginationInput!): UsersPage!
      @hasPermission(permission: "${Permission.USERS_MANAGE}")
      @isAuthenticated
  }
`;

export { resolver, toUserCursor, typeDefs };
