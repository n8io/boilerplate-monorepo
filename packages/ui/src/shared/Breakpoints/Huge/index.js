import { Breakpoint } from '@boilerplate-monorepo/ui-common';
import { useMediaQuery } from 'shared/useMediaQuery';

const Huge = ({ children }) => {
  const isHuge = useMediaQuery({ minWidth: Breakpoint.HUGE });

  return isHuge ? children : null;
};

export { Huge };
