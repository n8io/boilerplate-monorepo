import { gql } from 'apollo-server-express';
import { graphqlClient, responseToData } from 'testHelpers';

describe('system time query', () => {
  const { execQuery } = graphqlClient;

  const query = gql`
    query SystemTime {
      systemTime
    }
  `;

  test('returns the system time', async () => {
    const before = new Date();
    const response = await execQuery({ query });
    const after = new Date();
    const actual = responseToData(response);

    expect(actual).toBeBetween(before, after);
  });
});
