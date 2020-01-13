import { gql } from '@apollo/client';

const ME = gql`
  query me {
    me {
      id
      email
    }
  }
`;

export const Query = {
  ME,
};
