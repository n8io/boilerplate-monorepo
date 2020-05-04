import { User } from '@boilerplate-monorepo/common';
import { client } from 'db';
import { loader } from './user';

describe('user loader', () => {
  const dbUser = User.dbExample();
  const { id } = dbUser;

  let read = null;

  beforeEach(() => {
    read = td.replace(client.users, 'read');
  });

  test('eventually makes a call to read', async () => {
    td.when(read([id])).thenResolve([dbUser]);

    const user = await loader.load(id);

    expect(user).toEqual(dbUser);
  });
});
