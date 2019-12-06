import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import { useMediaQuery } from 'shared/useMediaQuery';

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: Breakpoint.SMALL - 1 });

  return isMobile ? children : null;
};

export { Mobile };
