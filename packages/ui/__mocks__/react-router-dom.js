export * from 'react-router-dom';

const history = {
  push: jest.fn().mockName('history.push'),
};

const useHistory = () => history;

export { useHistory };
