import { useMediaQuery } from 'react-responsive';

const Breakpoint = {
  HUGE: 1440,
  LARGE: 1170,
  MEDIUM: 768,
  SMALL: 450,
};

const Huge = ({ children }) => {
  const isHuge = useMediaQuery({ minWidth: Breakpoint.HUGE });

  return isHuge ? children : null;
};

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: Breakpoint.LARGE });

  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: Breakpoint.MEDIUM });

  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: Breakpoint.SMALL - 1 });

  return isMobile ? children : null;
};

const GreaterThanMobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: Breakpoint.SMALL });

  return isMobile ? children : null;
};

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 0 });

  return isNotMobile ? children : null;
};

export { Default, Desktop, GreaterThanMobile, Huge, Mobile, Tablet };
