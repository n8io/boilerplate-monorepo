import { defaultTo, includes, pipe, prop } from 'ramda';
import { Access } from './typedef';

const hasPermission = (role, permission) =>
  pipe(prop(permission), defaultTo([]), includes(role))(Access);

export { hasPermission };
