import * as Sentry from '@sentry/node';
import { config } from 'config';
import { contextToLog, userToLog } from './transforms';
import { Component, Module, Tag } from './typedef';

const {
  SENTRY_DSN,
  environment,
  isDev,
  isTelemetryEnabled,
  name,
  version,
} = config;

isTelemetryEnabled &&
  Sentry.init({
    dsn: SENTRY_DSN,
    environment,
    release: isDev ? `${name}@unreleased` : `${name}@${version}`,
  });

const Telemetry = {
  Component,
  Module,
  Sentry,
  Tag,
  contextToLog,
  userToLog,
};

export { Telemetry };
