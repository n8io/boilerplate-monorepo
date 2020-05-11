import { toSafeData, toSafeLog } from './toSafeLog';

const REDACTION_STRING = '**********';

describe('toSafeLog', () => {
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

  describe('toSafeData', () => {
    test('redacts sensitive props', () => {
      expect(toSafeData(input)).toEqual(expected);
    });
  });

  describe('toSafeLog', () => {
    test('redacts sensitive props and stringifies', () => {
      expect(toSafeLog(input)).toEqual(JSON.stringify(expected));
    });
  });
});
