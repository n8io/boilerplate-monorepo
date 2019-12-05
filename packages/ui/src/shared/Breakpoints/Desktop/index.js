import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import { useMediaQuery } from 'shared/useMediaQuery';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: Breakpoint.LARGE });

  return isDesktop ? children : null;
};

export { Desktop };
