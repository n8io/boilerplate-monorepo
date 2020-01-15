import { gql } from '@apollo/client';

const ME = gql`
  query me {
    me {
      id
      email
      username
    }
  }
`;

export const Query = {
  ME,
};
