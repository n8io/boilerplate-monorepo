import { Permission } from '@boilerplate-monorepo/common';
import {
  ForbiddenError,
  gql,
  SchemaDirectiveVisitor,
} from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { log } from 'log';

class hasPermission extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = (...args) => {
      const [, , context, { fieldName }] = args;
      const { user } = context;

      const { role } = user;
      const { permission } = this.args;

      if (!Permission.hasPermission(role, permission)) {
        log.error(
          `You do not have permission for this resource: ${fieldName}.`,
          {
            id: user.id,
            role,
            username: user.username,
          }
        );

        throw new ForbiddenError('You are not authorized for this resource.');
      }

      return resolve.apply(this, args);
    };
  }
}

const typeDefs = gql`
  directive @hasPermission(permission: String!) on FIELD_DEFINITION | FIELD
`;

export { hasPermission as directive, typeDefs };
