/* eslint-disable max-nested-callbacks,max-statements,no-console */
import { LogLevel, UserSnapshot } from '@boilerplate-monorepo/common';
import * as Config from 'config';
import { log } from 'log';
import { toLower } from 'ramda';
import { Telemetry } from 'types/telemetry';

const isoDate = '1900-01-01T00:00:00.000Z';
const mockDate = new Date(isoDate);

describe('log', () => {
  const isTest = false;
  const message = 'MESSAGE';

  const realFns = {};
  const mockFns = {};
  const fns = [LogLevel.ERROR, LogLevel.INFO, LogLevel.WARN].map(toLower);

  beforeEach(() => {
    fns.forEach((name) => {
      realFns[name] = console[name];
      mockFns[name] = jest.fn().mockName(`console.${name}`);
    });

    fns.forEach((name) => {
      console[name] = mockFns[name];
    });

    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  afterEach(() => {
    fns.forEach((name) => {
      console[name] = realFns[name];
    });
  });

  describe('when logging', () => {
    const data = { extra: 'DATA' };
    const isTelemetryEnabled = false;

    beforeEach(() => {
      td.replace(Config, 'config', { isTelemetryEnabled, isTest });
    });

    const testCases = [
      {
        args: [message, data],
        expected: [`${isoDate}: 🛑 ${message}`, data],
        logLevel: LogLevel.ERROR,
      },
      {
        args: [message, data],
        expected: [`${isoDate}: ℹ️ ${message}`, data],
        logLevel: LogLevel.INFO,
      },
      {
        args: [message, data],
        expected: [`${isoDate}: ⚠️ ${message}`, data],
        logLevel: LogLevel.WARN,
      },
    ];

    testCases.forEach(({ args, expected, logLevel }) => {
      const name = logLevel.toLowerCase();

      test(`log.${name} logs the correct message`, () => {
        log[name](...args);

        expect(mockFns[name]).toHaveBeenCalledWith(...expected);
      });
    });

    test('always returns undefined', () => {
      const logLevel = LogLevel.ERROR.toLowerCase();

      expect(log[logLevel]()).toBeUndefined();
    });

    describe('and is test environment', () => {
      const logLevel = LogLevel.ERROR.toLowerCase();

      beforeEach(() => {
        td.replace(Config, 'config', { isTest: true });
      });

      test('does not log anything', () => {
        log[logLevel](message);

        expect(mockFns[logLevel]).not.toHaveBeenCalled();
      });
    });
  });

  describe('when there is data to log', () => {
    const data = { extra: 'DATA' };

    describe('and telemetry is enabled', () => {
      const isTelemetryEnabled = true;
      const logLevel = LogLevel.ERROR;
      const user = UserSnapshot.apiExample();

      let captureException = null;
      let captureMessage = null;
      let setExtras = null;
      let setLevel = null;
      let setTags = null;
      let setUser = null;

      beforeEach(() => {
        captureException = jest.fn().mockName('captureException');
        captureMessage = jest.fn().mockName('captureMessage');
        setExtras = jest.fn().mockName('scope.setExtras');
        setLevel = jest.fn().mockName('scope.setLevel');
        setTags = jest.fn().mockName('scope.setTags');
        setUser = jest.fn().mockName('scope.setUser');

        const scope = { setExtras, setLevel, setTags, setUser };

        const withScope = jest
          .fn()
          .mockName('withScope')
          .mockImplementation((fn) => fn(scope));

        const Sentry = { captureException, captureMessage, withScope };

        td.replace(Telemetry, 'Sentry', Sentry);
        td.replace(Config, 'config', { isTelemetryEnabled, isTest });
      });

      test('telemetry sets the log level', () => {
        log[logLevel.toLowerCase()](message, data);

        expect(setLevel).toHaveBeenCalledWith(logLevel.toLowerCase());
      });

      describe('and there are tags', () => {
        const tags = { tag: 'TAG' };

        test('telemetry captures the tags', () => {
          log[logLevel.toLowerCase()](message, { data, tags });

          expect(setTags).toHaveBeenCalledWith(tags);
        });
      });

      describe('and there are NO tags', () => {
        test('telemetry captures the tags', () => {
          log[logLevel.toLowerCase()](message, { data });

          expect(setTags).not.toHaveBeenCalled();
        });
      });

      describe('and there is a user', () => {
        test('telemetry captures the user', () => {
          log[logLevel.toLowerCase()](message, { data, user });

          expect(setUser).toHaveBeenCalledWith(Telemetry.userToLog(user));
        });
      });

      describe('and there is NOT a user', () => {
        test('telemetry captures the user', () => {
          log[logLevel.toLowerCase()](message, { data });

          expect(setUser).not.toHaveBeenCalled();
        });
      });

      describe('and there is additional data', () => {
        const additionalData = { otherData: 'OTHER_DATA' };

        test('telemetry captures the extra data', () => {
          log[logLevel.toLowerCase()](message, { ...additionalData, ...data });

          expect(setExtras).toHaveBeenCalledWith({
            ...additionalData,
            ...data,
          });
        });
      });

      describe('and the additional data has a prop that is an object', () => {
        const anObject = { prop1: 'PROP_1' };
        const additionalData = { anObject };

        test('telemetry captures the extra data and stringifies props that are objects', () => {
          log[logLevel.toLowerCase()](message, { ...additionalData, ...data });

          expect(setExtras).toHaveBeenCalledWith({
            ...data,
            anObject: JSON.stringify(anObject),
          });
        });
      });

      describe('and there is NOT additional data', () => {
        const additionalData = {};

        test('telemetry captures the extra data', () => {
          log[logLevel.toLowerCase()](message, additionalData);

          expect(setExtras).not.toHaveBeenCalled();
        });
      });

      describe('and there is an error', () => {
        const error = new Error('ERROR');

        test('telemetry captures the exception', () => {
          log[logLevel.toLowerCase()](message, { data, error });

          expect(captureException).toHaveBeenCalledWith(error);
          expect(captureMessage).not.toHaveBeenCalled();
        });
      });

      describe('and there is NOT an error', () => {
        const error = undefined;

        test('telemetry captures the message', () => {
          log[logLevel.toLowerCase()](message, { data, error });

          expect(captureMessage).toHaveBeenCalledWith(message);
          expect(captureException).not.toHaveBeenCalled();
        });
      });
    });

    describe('and telemetry is NOT enabled', () => {
      const isTelemetryEnabled = false;
      const logLevel = LogLevel.ERROR;

      let captureException = null;
      let captureMessage = null;
      let setExtras = null;
      let setLevel = null;
      let setTags = null;
      let setUser = null;

      beforeEach(() => {
        captureException = jest.fn().mockName('captureException');
        captureMessage = jest.fn().mockName('captureMessage');
        setExtras = jest.fn().mockName('scope.setExtras');
        setLevel = jest.fn().mockName('scope.setLevel');
        setTags = jest.fn().mockName('scope.setTags');
        setUser = jest.fn().mockName('scope.setUser');

        const scope = { setExtras, setLevel, setTags, setUser };

        const withScope = jest
          .fn()
          .mockName('withScope')
          .mockImplementation((fn) => fn(scope));

        const Sentry = { captureException, captureMessage, withScope };

        td.replace(Telemetry, 'Sentry', Sentry);
        td.replace(Config, 'config', { isTelemetryEnabled, isTest });
      });

      test('no telemetry data is logged', () => {
        log[logLevel.toLowerCase()](message, data);

        expect(captureException).not.toHaveBeenCalled();
        expect(captureMessage).not.toHaveBeenCalled();
        expect(setExtras).not.toHaveBeenCalled();
        expect(setLevel).not.toHaveBeenCalled();
        expect(setTags).not.toHaveBeenCalled();
        expect(setUser).not.toHaveBeenCalled();
      });
    });
  });

  describe('when there is NOT data to log', () => {
    const data = undefined;

    describe('and telemetry is enabled', () => {
      const isTelemetryEnabled = true;
      const logLevel = LogLevel.ERROR;

      let captureException = null;
      let captureMessage = null;
      let setExtras = null;
      let setLevel = null;
      let setTag = null;
      let setUser = null;

      beforeEach(() => {
        captureException = jest.fn().mockName('captureException');
        captureMessage = jest.fn().mockName('captureMessage');
        setExtras = jest.fn().mockName('scope.setExtras');
        setLevel = jest.fn().mockName('scope.setLevel');
        setTag = jest.fn().mockName('scope.setTag');
        setUser = jest.fn().mockName('scope.setUser');

        const scope = { setExtras, setLevel, setTag, setUser };

        const withScope = jest
          .fn()
          .mockName('withScope')
          .mockImplementation((fn) => fn(scope));

        const Sentry = { captureException, captureMessage, withScope };

        td.replace(Telemetry, 'Sentry', Sentry);
        td.replace(Config, 'config', { isTelemetryEnabled, isTest });
      });

      test('telemetry sets the log level', () => {
        log[logLevel.toLowerCase()](message, data);

        expect(setLevel).toHaveBeenCalledWith(logLevel);
      });

      test('telemetry captures the expected tags', () => {
        const tagArgs = [Telemetry.Tag.MODULE, Telemetry.Module.UNCATEGORIZED];

        log[logLevel.toLowerCase()](message, data);

        expect(setTag).toHaveBeenCalledWith(...tagArgs);
      });

      test('telemetry captures the message', () => {
        log[logLevel.toLowerCase()](message, data);

        expect(captureMessage).toHaveBeenCalledWith(message);
        expect(captureException).not.toHaveBeenCalled();
      });
    });
  });
});
/* eslint-enable max-nested-callbacks,max-statements,no-console */
