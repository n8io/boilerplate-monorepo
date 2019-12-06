import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import { useMediaQuery } from 'shared/useMediaQuery';

const GreaterThanMobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: Breakpoint.SMALL });

  return isMobile ? children : null;
};

export { GreaterThanMobile };
