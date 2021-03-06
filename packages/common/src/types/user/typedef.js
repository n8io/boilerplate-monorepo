import gql from 'graphql-tag';
import { shape, string } from 'prop-types';

const typeDef = gql`
  # The user type
  type User {
    # The user's email
    email: EmailAddress!
    # The user's last name
    familyName: String!
    # The user's first name
    givenName: String!
    # The user's unique id
    id: String!
    # The user's unique username
    username: String!
  }
`;

const propTypes = shape({
  email: string,
  familyName: string,
  givenName: string,
  id: string.isRequired,
  username: string.isRequired,
});

export { propTypes, typeDef };
