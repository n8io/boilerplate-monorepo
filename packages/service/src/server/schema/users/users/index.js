import {
  Pagination,
  Permission,
  UserSnapshot,
  Utils,
} from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { join, pick, pipe, take, unless, values } from 'ramda';
import { DatabaseError } from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Telemetry } from 'types/telemetry';

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

// eslint-disable-next-line max-statements
const resolver = async (_parent, { input }, context) => {
  debugLog(`👾 ${QUERY_NAME}`, input);

  const telemetry = {
    input,
    query: QUERY_NAME,
    ...Telemetry.contextToLog(context),
    tags: {
      [Telemetry.Tag.COMPONENT]: Telemetry.Component.USERS,
      [Telemetry.Tag.MODULE]: Telemetry.Module.RESOLVER,
    },
  };

  const { db } = context;

  let users = [];
  let pagination = null;

  try {
    ({ pagination, users } = await db.users.readPaginated(input));
  } catch (error) {
    log.error(InternalErrorMessage.USERS_FETCH_FAILED, {
      error,
      ...telemetry,
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
    "The user's cursor id"
    cursor: String!
    "The user's snapshot"
    node: UserSnapshot!
  }

  "A page info"
  type PageInfo {
    "The last returned node's cursor"
    endCursor: String
    "Whether or not there is another page of results"
    hasNextPage: Boolean!
    "Whether or not there is a previous page of results"
    hasPreviousPage: Boolean!
    "The total number of results returned"
    total: Int!
  }

  "A page of users"
  type UsersPage {
    "The list of user edges"
    edges: [UserEdge!]!
    "The pagination summary info"
    pageInfo: PageInfo!
  }

  "The input type for paged results"
  input PaginationInput {
    "The cursor the results should start (inclusive)"
    after: String
    "The number of results per page"
    first: Int
  }

  type Query {
    "Fetch a page of users"
    ${QUERY_NAME}(
      "The pagination input for the users query"
      input: PaginationInput!
    ): UsersPage!
      @hasPermission(permission: "${Permission.USERS_MANAGE}")
      @isAuthenticated
  }
`;

export { resolver, toUserCursor, typeDefs };
