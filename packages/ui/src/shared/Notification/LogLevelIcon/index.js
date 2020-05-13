import { LogLevel } from '@boilerplate-monorepo/common';
import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdErrorOutline, MdInfoOutline, MdWarning } from 'react-icons/md';

const logLevelToIconMap = {
  [LogLevel.ERROR]: <MdErrorOutline data-testid="ERROR" />,
  [LogLevel.INFO]: <MdInfoOutline data-testid="INFO" />,
  [LogLevel.SUCCESS]: <FaRegCheckCircle data-testid="SUCCESS" />,
  [LogLevel.WARN]: <MdWarning data-testid="WARN" />,
};

const LogLevelIcon = ({ type }) => logLevelToIconMap[type];

LogLevelIcon.propTypes = {
  type: LogLevel.propTypes.isRequired,
};

export { LogLevelIcon };
