import gql from 'graphql-tag';
import { shape, string } from 'prop-types';

const typeDef = gql`
  "The user snapshot type"
  type UserSnapshot {
    "The user's email"
    email: EmailAddress!
    "The user's last name"
    familyName: String!
    "The user's first name"
    givenName: String!
    "The user's unique id"
    id: String!
    "The user's role"
    role: UserRole!
    "The user's unique username"
    username: String!
  }
`;

const propTypes = shape({
  email: string.isRequired,
  familyName: string.isRequired,
  givenName: string.isRequired,
  id: string.isRequired,
  role: string.isRequired,
  username: string.isRequired,
});

export { propTypes, typeDef };
