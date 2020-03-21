import { LogLevel } from '@boilerplate-monorepo/common';
import { string } from 'prop-types';
import React from 'react';
import { Notification } from '../Notification';

const InfoNotification = ({ message }) => (
  <Notification type={LogLevel.INFO}>{message}</Notification>
);

InfoNotification.propTypes = {
  message: string.isRequired,
};

export { InfoNotification };
