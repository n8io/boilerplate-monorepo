import { node, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';

const domTestId = 'Page';

const Page = ({ children, 'data-testid': dataTestId }) => {
  const [isLoading, beLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      beLoading(false);
    });

    return () => clearTimeout(timeout);
  }, [isLoading, beLoading]);

  return (
    <FocusLock disabled={!isLoading} data-testid={dataTestId}>
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
