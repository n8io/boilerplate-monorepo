export * from 'react-router-dom';

const history = {
  push: jest.fn().mockName('history.push'),
};

const useHistory = () => history;
const useLocation = () => ({
  host: 'HOST',
  href: 'HREF',
  pathname: 'PATHNAME',
  port: 'PORT',
  protocol: 'PROTOCOL',
});

export { useHistory, useLocation };
