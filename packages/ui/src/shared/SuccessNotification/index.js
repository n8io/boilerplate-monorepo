import { LogLevel } from '@boilerplate-monorepo/common';
import { string } from 'prop-types';
import React from 'react';
import { Notification } from '../Notification';

const SuccessNotification = ({ message }) => (
  <Notification type={LogLevel.SUCCESS}>{message}</Notification>
);

SuccessNotification.propTypes = {
  message: string.isRequired,
};

export { SuccessNotification };
