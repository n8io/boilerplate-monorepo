import { hasPermission } from './selectors';
import { Enumeration } from './typedef';

const Permission = {
  ...Enumeration,
  hasPermission,
};

export { Permission };
