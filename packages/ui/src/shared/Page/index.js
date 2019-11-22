import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { useModality } from 'shared/useModality';

const Page = ({ children }) => {
  const [isLoading, beLoading] = useState(true);
  const { isEnabled: isModalityEnabled } = useModality();

  useEffect(() => {
    const timeout = setTimeout(() => {
      beLoading(false);
    });

    return () => clearTimeout(timeout);
  }, [isLoading, beLoading]);

  return (
    <FocusLock disabled={!isLoading || !isModalityEnabled}>
      {children}
    </FocusLock>
  );
};

Page.propTypes = {
  children: node.isRequired,
};

export { Page };
