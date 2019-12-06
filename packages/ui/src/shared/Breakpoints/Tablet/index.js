import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import { useMediaQuery } from 'shared/useMediaQuery';

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: Breakpoint.MEDIUM });

  return isTablet ? children : null;
};

export { Tablet };
