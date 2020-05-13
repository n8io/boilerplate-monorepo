import * as Sentry from '@sentry/node';
import { init } from './creation';
import { contextToLog, userToLog } from './transforms';
import { Component, Module, Tag } from './typedef';

const Telemetry = {
  Component,
  Module,
  Sentry,
  Tag,
  contextToLog,
  init,
  userToLog,
};

export { Telemetry };
