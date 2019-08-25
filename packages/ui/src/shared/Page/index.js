import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';

const Page = ({ children }) => {
  const [isLoading, beLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      beLoading(false);
    });

    return () => clearTimeout(timeout);
  }, [isLoading, beLoading]);

  return <FocusLock disabled={!isLoading}>{children}</FocusLock>;
};

Page.propTypes = {
  children: node.isRequired,
};

export { Page };
