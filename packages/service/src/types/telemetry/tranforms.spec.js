import { User } from '@boilerplate-monorepo/common';
import { Telemetry } from './index';

describe('transforms', () => {
  describe('contextToLog', () => {
    const ip = '127.0.0.1';
    const requestId = 'REQUEST_ID';
    const user = User.apiExample();
    const context = { ip, requestId, user };

    test('converts context to log format', () => {
      const actual = Telemetry.contextToLog(context);

      const expected = {
        // eslint-disable-next-line camelcase
        ip_address: ip,
        requestId,
        user: Telemetry.userToLog(user),
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('userToLog', () => {
    const user = User.apiExample();

    test('selects only the expected user props', () => {
      expect(Telemetry.userToLog(user)).toEqual({
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
      });
    });
  });
});
