/* eslint-disable max-nested-callbacks */
import * as Sentry from '@sentry/node';
import * as Config from 'config';
import { neverCalled } from 'testHelpers';
import { Telemetry } from './index';

describe('telemetry creation', () => {
  describe('init', () => {
    const dsn = 'DSN';
    const environment = 'ENVIRONMENT';
    const name = 'NAME';
    const version = 'VERSION';

    const defaultConfig = {
      SENTRY_DSN: dsn,
      environment,
      isDev: false,
      isTelemetryEnabled: true,
      name,
      version,
    };

    let configureScope = null;
    let init = null;

    beforeEach(() => {
      configureScope = td.replace(Sentry, 'configureScope');
      init = td.replace(Sentry, 'init');
    });

    describe('when telemetry is enabled', () => {
      const isTelemetryEnabled = true;

      describe('and is development', () => {
        const isDev = true;

        beforeEach(() => {
          td.replace(Config, 'config', {
            ...defaultConfig,
            isDev,
            isTelemetryEnabled,
          });
        });

        test('initializes Sentry', () => {
          Telemetry.init();

          td.verify(
            init({
              dsn,
              environment,
              release: 'unreleased',
            })
          );
        });
      });

      describe('and is NOT development', () => {
        const isDev = false;

        beforeEach(() => {
          td.replace(Config, 'config', {
            ...defaultConfig,
            isDev,
            isTelemetryEnabled,
          });
        });

        test('initializes Sentry', () => {
          Telemetry.init();

          td.verify(
            init({
              dsn,
              environment,
              release: version,
            })
          );
        });
      });
    });

    describe('when telemetry is NOT enabled', () => {
      const isTelemetryEnabled = false;

      beforeEach(() => {
        td.replace(Config, 'config', { ...defaultConfig, isTelemetryEnabled });
      });

      test('should not initialize anything', () => {
        Telemetry.init();

        td.verify(init(), neverCalled);
        td.verify(configureScope(), neverCalled);
      });
    });
  });
});
/* eslint-enable max-nested-callbacks */
