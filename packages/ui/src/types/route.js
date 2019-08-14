import { shape, string } from 'prop-types';

export const propTypes = shape({
  key: string.isRequired,
  path: string.isRequired,
});

export const Route = {
  DASHBOARD: {
    name: 'dashboard',
    path: '/dashboard',
  },
  ROOT: {
    name: 'root',
    path: '/',
  },
};
