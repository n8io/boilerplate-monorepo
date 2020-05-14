/* eslint-disable max-nested-callbacks */
import * as Sentry from '@sentry/node';
import * as Config from 'config';
import { neverCalled } from 'testHelpers';
import { Telemetry } from './index';

describe('telemetry creation', () => {
  describe('init', () => {
    const dsn = 'DSN';
    const environment = 'ENVIRONMENT';
    const release = 'RELEASE';

    const defaultConfig = {
      RELEASE: release,
      SENTRY_DSN: dsn,
      environment,
      isTelemetryEnabled: true,
    };

    let configureScope = null;
    let init = null;

    beforeEach(() => {
      configureScope = td.replace(Sentry, 'configureScope');
      init = td.replace(Sentry, 'init');
    });

    describe('when telemetry is enabled', () => {
      const isTelemetryEnabled = true;

      beforeEach(() => {
        td.replace(Config, 'config', {
          ...defaultConfig,
          isTelemetryEnabled,
        });
      });

      test('initializes Sentry', () => {
        Telemetry.init();

        td.verify(
          init({
            dsn,
            environment,
            release,
          })
        );
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
