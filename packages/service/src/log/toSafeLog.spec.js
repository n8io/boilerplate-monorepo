import { toSafeLog } from './toSafeLog';

const REDACTION_STRING = '**********';

describe('toSafeLog', () => {
  test('redacts sensitive props', () => {
    const input = {
      password: 'PASSWORD',
      user: {
        passwordHash: 'PASSWORD_HASH',
        recovery: {
          deeplyNested: {
            token: 'TOKEN',
          },
          recoveryCode: 'RECOVERY_CODE',
        },
      },
    };

    const expected = {
      password: REDACTION_STRING,
      user: {
        passwordHash: REDACTION_STRING,
        recovery: {
          deeplyNested: { token: REDACTION_STRING },
          recoveryCode: REDACTION_STRING,
        },
      },
    };

    expect(toSafeLog(input)).toEqual(JSON.stringify(expected));
  });
});
