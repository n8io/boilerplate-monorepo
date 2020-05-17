import { Permission, UserRole } from '@boilerplate-monorepo/common';
import { oneOf } from 'prop-types';

const Can = ({ children, permission, role }) => {
  if (!Permission.hasPermission(role, permission)) return null;

  return children;
};

Can.propTypes = {
  permission: oneOf(Permission.values).isRequired,
  role: oneOf(UserRole.values).isRequired,
};

export { Can };
