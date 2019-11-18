import { node, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { useModality } from 'shared/useModality';

const domTestId = 'Page';

const Page = ({ children, 'data-testid': dataTestId }) => {
  const [isLoading, beLoading] = useState(true);
  const { isEnabled: isModalityEnabled } = useModality();

  useEffect(() => {
    const timeout = setTimeout(() => {
      beLoading(false);
    });

    return () => clearTimeout(timeout);
  }, [isLoading, beLoading]);

  return (
    <FocusLock
      disabled={!isLoading || !isModalityEnabled}
      data-testid={dataTestId}
    >
      {children}
    </FocusLock>
  );
};

Page.defaultProps = {
  'data-testid': domTestId,
};

Page.propTypes = {
  children: node.isRequired,
  'data-testid': string,
};

export { Page };
