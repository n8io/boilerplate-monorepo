import { Utils } from '@boilerplate-monorepo/common';
import {
  ForbiddenError,
  gql,
  SchemaDirectiveVisitor,
} from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { log } from 'log';
import { Telemetry } from 'types/telemetry';

class isAuthenticated extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = (...args) => {
      const [, input, context, { fieldName }] = args;
      const { user } = context;

      if (!user) {
        log.error(`An unauthenticated request was made: ${fieldName}`, {
          input: Utils.isNullOrEmpty(input) ? undefined : { input },
          query: fieldName,
          ...Telemetry.contextToLog(context),
          tags: {
            [Telemetry.Tag.COMPONENT]: Telemetry.Component.IS_AUTHENTICATED,
            [Telemetry.Tag.MODULE]: Telemetry.Module.DIRECTIVE,
          },
        });

        throw new ForbiddenError(
          'You must be authenticated for this resource.'
        );
      }

      return resolve.apply(this, args);
    };
  }
}

const typeDefs = gql`
  directive @isAuthenticated on FIELD_DEFINITION
`;

export { isAuthenticated as directive, typeDefs };
