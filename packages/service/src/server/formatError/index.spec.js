/* eslint-disable max-nested-callbacks */

import { LogLevel } from '@boilerplate-monorepo/common';
import * as Config from 'config';
import { log } from 'log';
import { identity } from 'ramda';
import { Telemetry } from 'types/telemetry';
import { formatError } from './index';

describe('formatError', () => {
  const defaultError = { message: 'MESSAGE' };

  describe('when there is an internal server error', () => {
    const error = {
      ...defaultError,
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    };

    let logError = null;

    beforeEach(() => {
      logError = td.replace(log, LogLevel.ERROR.toLowerCase());
    });

    test('logs errors appropriately', () => {
      formatError(error);

      td.verify(
        logError(td.matchers.isA(String), {
          error,
          tags: {
            [Telemetry.Tag.COMPONENT]: Telemetry.Component.FORMAT_ERROR,
            [Telemetry.Tag.MODULE]: Telemetry.Module.GRAPHQL,
          },
        })
      );
    });
  });

  describe('when there is sensitive information in the error', () => {
    describe('and there is a toSafeError extension', () => {
      const toSafeError = jest
        .fn()
        .mockName('toSafeError')
        .mockImplementation(identity);

      const error = {
        ...defaultError,
        extensions: { toSafeError },
        password: 'PASSWORD',
      };

      test('calls the custom toSafeError', () => {
        formatError(error);

        expect(toSafeError).toHaveBeenCalledWith(error);
      });
    });

    describe('and there is sensitive information', () => {
      describe('and the environment is development', () => {
        const isDev = true;

        beforeEach(() => {
          td.replace(Config, 'config', { isDev });
        });

        test('sensitive information is NOT removed', () => {
          const exception = 'EXCEPTION';

          const error = {
            ...defaultError,
            extensions: { exception },
            password: 'PASSWORD',
          };

          const { extensions } = formatError(error);

          expect(extensions).toHaveProperty('exception', exception);
        });
      });

      describe('and the environment is NOT development', () => {
        const isDev = false;

        beforeEach(() => {
          td.replace(Config, 'config', { isDev });
        });

        describe('and the there is a toSafeError extension', () => {
          const toSafeError = jest
            .fn()
            .mockName('toSafeError')
            .mockImplementation(identity);

          test('sensitive information is removed', () => {
            const error = {
              ...defaultError,
              extensions: { exception: 'EXCEPTION', toSafeError },
              password: 'PASSWORD',
            };

            const { extensions } = formatError(error);

            expect(toSafeError).toHaveBeenCalledWith(error);
            expect(extensions).not.toHaveProperty('exception');
          });
        });

        describe('and the there is NOT a toSafeError extension', () => {
          const toSafeError = null;

          test('sensitive information is removed', () => {
            const error = {
              ...defaultError,
              extensions: { exception: 'EXCEPTION', toSafeError },
              password: 'PASSWORD',
            };

            const { extensions } = formatError(error);

            expect(extensions).not.toHaveProperty('exception');
          });
        });
      });
    });
  });

  describe('when the extension code is a composition', () => {
    const parent = 'PARENT';
    const child = 'CHILD';
    const code = `${parent}:${child}`;
    const extensions = { code };
    const error = { ...defaultError, extensions };

    test('the extension code is reduced to its parent key', () => {
      const { extensions: actual } = formatError(error);

      expect(actual).toHaveProperty('code', parent);
    });
  });
});
/* eslint-enable max-nested-callbacks */
