import { LogLevel } from '@boilerplate-monorepo/common';
import { func, instanceOf, string } from 'prop-types';
import React from 'react';
import { Notification } from '../Notification';
import { toErrorMessage } from '../graphql/utils/toErrorMessage';
import { useTranslate } from '../useTranslate';

const ErrorNotification = ({ error, messageKey, t: originalT }) => {
  const fallbackT = useTranslate();

  if (!error) return null;

  const actualT = originalT || fallbackT;
  const message = toErrorMessage(actualT, error);

  return (
    <Notification type={LogLevel.ERROR}>
      {actualT(messageKey, { message })}
    </Notification>
  );
};

ErrorNotification.defaultProps = {
  error: undefined,
  t: undefined,
};

ErrorNotification.propTypes = {
  error: instanceOf(Error),
  messageKey: string.isRequired,
  t: func,
};

export { ErrorNotification };
