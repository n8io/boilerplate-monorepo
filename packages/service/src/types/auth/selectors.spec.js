import { User } from '@boilerplate-monorepo/common';
import { config } from 'config';
import JsonWebToken from 'jsonwebtoken';
import ms from 'ms';
import { Auth } from 'types/auth';
import { Route } from 'types/route';
import { CUID } from '../../../__mocks__/cuid';
import {
  decryptAccessToken,
  decryptRefreshToken,
  encryptAccessToken,
  encryptRefreshToken,
} from './selectors';
import { Enumeration } from './typedef';

const {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} = config;

describe('auth selectors', () => {
  describe('decryptAccessToken', () => {
    const user = User.apiExample();
    const token = encryptAccessToken(user);

    let verify = null;

    beforeEach(() => {
      verify = td.replace(JsonWebToken, 'verify');
    });

    test('makes expected call to verify method', () => {
      decryptAccessToken(token);

      td.verify(verify(token, ACCESS_TOKEN_SECRET));
    });
  });

  describe('decryptRefreshToken', () => {
    const user = User.apiExample();
    const token = encryptRefreshToken(user);

    let verify = null;

    beforeEach(() => {
      verify = td.replace(JsonWebToken, 'verify');
    });

    test('makes expected call to verify method', () => {
      decryptRefreshToken(token);

      td.verify(verify(token, REFRESH_TOKEN_SECRET));
    });
  });

  describe('encryptAccessToken', () => {
    const user = User.apiExample();

    let sign = null;

    beforeEach(() => {
      sign = td.replace(JsonWebToken, 'sign');
    });

    test('makes expected call to sign method', () => {
      Auth.encryptAccessToken(user);

      const dataToEncrypt = {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
      };

      td.verify(
        sign(dataToEncrypt, ACCESS_TOKEN_SECRET, {
          expiresIn: ACCESS_TOKEN_EXPIRY,
        })
      );
    });
  });

  describe('encryptRefreshToken', () => {
    const user = User.apiExample();

    let sign = null;

    beforeEach(() => {
      sign = td.replace(JsonWebToken, 'sign');
    });

    test('makes expected call to sign method', () => {
      encryptRefreshToken(user);

      const dataToEncrypt = {
        email: user.email,
        id: user.id,
        role: user.role,
        tokenVersion: user.tokenVersion,
        username: user.username,
      };

      td.verify(
        sign(dataToEncrypt, REFRESH_TOKEN_SECRET, {
          expiresIn: REFRESH_TOKEN_EXPIRY,
        })
      );
    });
  });

  describe('generateResetToken', () => {
    const user = User.apiExample();

    test('does not return the leading `c` of the cuid', () => {
      const actual = Auth.generateResetToken(user);
      const [firstChar] = actual.split('');

      expect(firstChar).not.toEqual('c');
    });

    test('returns the remainder of the cuid', () => {
      const actual = Auth.generateResetToken(user);
      const [, ...rest] = CUID;

      expect(actual).toEqual(rest.join(''));
    });
  });

  describe('isUserActive', () => {
    /* eslint-disable camelcase */
    describe('when active', () => {
      const user = User.dbExample({
        deleted_at: null,
        deleted_by: null,
      });

      test('returns true', () => {
        const actual = Auth.isUserActive(user);

        expect(actual).toEqual(true);
      });
    });

    describe('when NOT active', () => {
      const user = User.dbExample({
        deleted_at: '2000-01-01T00:00:00Z',
        deleted_by: 'DELETED_BY',
      });

      test('returns false', () => {
        const actual = Auth.isUserActive(user);

        expect(actual).toEqual(false);
      });
    });
    /* eslint-enable camelcase */
  });

  describe('readAccessToken', () => {
    const user = User.apiExample();

    describe('when there is a bearer token', () => {
      const token = Auth.encryptAccessToken(user);

      const req = {
        headers: {
          [Enumeration.AUTHORIZATION_HEADER]: `BEARER ${token}`,
        },
      };

      test('returns the decrypted access token', () => {
        const actual = Auth.readAccessToken(req);

        expect(actual).toMatchObject({
          email: user.email,
          id: user.id,
          role: user.role,
          username: user.username,
        });

        expect(typeof actual.exp).toBe('number');
        expect(typeof actual.iat).toBe('number');
      });
    });

    describe('when there is NOT a bearer token', () => {
      const req = { headers: {} };

      test('returns null', () => {
        const actual = Auth.readAccessToken(req);

        expect(actual).toBeNull();
      });
    });
  });

  describe('readRefreshToken', () => {
    const user = User.apiExample();

    describe('when there is a refresh cookie', () => {
      const token = encryptRefreshToken(user);

      const req = {
        cookies: {
          [Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME]: token,
        },
      };

      test('returns the decrypted refresh token', () => {
        const actual = Auth.readRefreshToken(req);

        expect(actual).toMatchObject({
          email: user.email,
          id: user.id,
          role: user.role,
          username: user.username,
        });

        expect(typeof actual.exp).toBe('number');
        expect(typeof actual.iat).toBe('number');
      });
    });

    describe('when there is NOT a refresh cookie', () => {
      const req = { cookies: {} };

      test('returns null', () => {
        const actual = Auth.readRefreshToken(req);

        expect(actual).toBeNull();
      });
    });
  });

  describe('writeRefreshToken', () => {
    const cookie = jest.fn().mockName('cookie');
    const res = { cookie };

    describe('when there is a user provided', () => {
      const user = User.apiExample();
      const token = encryptRefreshToken(user);

      test('writes the refresh cookie', () => {
        Auth.writeRefreshToken(res, user);

        const args = [
          Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME,
          token,
          {
            httpOnly: true,
            maxAge: ms(REFRESH_TOKEN_EXPIRY),
            path: Route.REFRESH_TOKEN,
            secure: NODE_ENV === 'production',
          },
        ];

        expect(cookie).toHaveBeenCalledWith(...args);
      });
    });

    describe('when there is NOT a user provided', () => {
      test('writes the refresh cookie', () => {
        Auth.writeRefreshToken(res);

        const args = [
          Enumeration.JWT_REFRESH_TOKEN_COOKIE_NAME,
          '',
          {
            httpOnly: true,
            maxAge: ms(REFRESH_TOKEN_EXPIRY),
            path: Route.REFRESH_TOKEN,
            secure: NODE_ENV === 'production',
          },
        ];

        expect(cookie).toHaveBeenCalledWith(...args);
      });
    });
  });
});
