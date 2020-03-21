import { LogLevel } from '@boilerplate-monorepo/common';
import { string } from 'prop-types';
import React from 'react';
import { Notification } from '../Notification';

const WarnNotification = ({ message }) => (
  <Notification type={LogLevel.WARN}>{message}</Notification>
);

WarnNotification.propTypes = {
  message: string.isRequired,
};

export { WarnNotification };
