import gql from 'graphql-tag';
import { values as ramdaValues } from 'ramda';

const Enumeration = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const typeDef = gql`
  "The user role enumeration"
  enum UserRole {
    "The admin user role"
    ADMIN
    "The default user role"
    USER
  }
`;

const values = ramdaValues(Enumeration);

export { Enumeration, typeDef, values };
