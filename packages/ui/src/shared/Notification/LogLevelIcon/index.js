import { LogLevel } from '@boilerplate-monorepo/common';
import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdErrorOutline, MdInfoOutline, MdWarning } from 'react-icons/md';

const LogLevelIcon = ({ type }) => {
  switch (type) {
    case LogLevel.ERROR:
      return <MdErrorOutline />;
    case LogLevel.INFO:
      return <MdInfoOutline />;
    case LogLevel.SUCCESS:
      return <FaRegCheckCircle />;
    case LogLevel.WARN:
      return <MdWarning />;
    default:
      return <MdInfoOutline />;
  }
};

LogLevelIcon.propTypes = {
  type: LogLevel.propTypes.isRequired,
};

export { LogLevelIcon };
