import { hasPermission } from './selectors';
import { Enumeration, values } from './typedef';

const Permission = {
  ...Enumeration,
  hasPermission,
  values,
};

export { Permission };
