import { User } from 'types/user';
import { makeInitial } from './creation';

describe('makeInitial', () => {
  test('converts a user to the initial shape', () => {
    const user = User.uiExample();
    const actual = makeInitial(user);
    const expected = {
      email: user.email,
      username: user.username,
    };

    expect(actual).toEqual(expected);
  });
});
