/**
 * This log utility is used to always log something to the console and
 * possibly logging platform, depending on the environment. If you want to add
 * ephemeral/conditional logging please use the `./logFactory`.
 */

import { LogLevel, Utils } from '@boilerplate-monorepo/common';
import { config } from 'config';
import { is } from 'ramda';
import { Telemetry } from 'types/telemetry';
import { toSafeData } from './toSafeLog';

const prefix = {
  [LogLevel.ERROR]: '🛑',
  [LogLevel.INFO]: 'ℹ️',
  [LogLevel.WARN]: '⚠️',
};

const prependInfo = (logLevel) =>
  `${new Date().toISOString()}: ${prefix[logLevel]}`;

const reduceToStringifiedValues = (acc, [key, value]) => {
  if (!is(Object, value)) {
    return {
      ...acc,
      [key]: value,
    };
  }

  return {
    ...acc,
    [key]: JSON.stringify(value),
  };
};

const printMessage = ({ data, logLevel, message }) => {
  const { isTelemetryEnabled, isTest } = config;

  if (isTest) return undefined;

  /* eslint-disable no-console */
  if (data) {
    const { error, tags } = data;
    const safeData = toSafeData(data);
    const { user, ...rest } = safeData;

    isTelemetryEnabled &&
      Telemetry.Sentry.withScope((scope) => {
        scope.setLevel(logLevel.toLowerCase());

        tags && scope.setTags(tags);
        user && scope.setUser(Telemetry.userToLog(user));

        if (!Utils.isNullOrEmpty(rest)) {
          const extras = Object.entries(rest).reduce(
            reduceToStringifiedValues,
            {}
          );

          scope.setExtras(extras);
        }

        error
          ? Telemetry.Sentry.captureException(error)
          : Telemetry.Sentry.captureMessage(message);
      });

    return console[logLevel.toLowerCase()](
      `${prependInfo(logLevel)} ${message}`,
      JSON.stringify(safeData)
    );
  }

  isTelemetryEnabled &&
    Telemetry.Sentry.withScope((scope) => {
      scope.setLevel(logLevel);
      scope.setTag(Telemetry.Tag.MODULE, Telemetry.Module.UNCATEGORIZED);

      Telemetry.Sentry.captureMessage(message);
    });

  return console[logLevel.toLowerCase()](`${prependInfo(logLevel)} ${message}`);
  /* eslint-enable no-console */
};

const log = {
  [LogLevel.ERROR.toLowerCase()]: (message, data) => {
    const logLevel = LogLevel.ERROR;

    return printMessage({ data, logLevel, message });
  },
  [LogLevel.INFO.toLowerCase()]: (message, data) => {
    const logLevel = LogLevel.INFO;

    return printMessage({ data, logLevel, message });
  },
  [LogLevel.WARN.toLowerCase()]: (message, data) => {
    const logLevel = LogLevel.WARN;

    return printMessage({ data, logLevel, message });
  },
};

export { log };
