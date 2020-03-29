import { defaultTo, includes, pipe, prop } from 'ramda';
import { Enumeration } from './typedef';

const hasPermission = (role, permission) =>
  pipe(prop(permission), defaultTo([]), includes(role))(Enumeration);

export { hasPermission };
