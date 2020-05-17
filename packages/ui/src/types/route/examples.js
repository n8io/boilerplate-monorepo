import { MdDashboard } from 'react-icons/md';
import { SORT_PROP_NAME } from './typedef';

const example = (overrides) => ({
  [SORT_PROP_NAME]: 1,
  exact: true,
  icon: MdDashboard,
  isAuthenticationRequired: false,
  name: 'dashboard',
  path: '/',
  requiredPermission: null,
  ...overrides,
});

export { example };
