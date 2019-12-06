import { useMediaQuery } from 'shared/useMediaQuery';

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 0 });

  return isNotMobile ? children : null;
};

export { Default };
