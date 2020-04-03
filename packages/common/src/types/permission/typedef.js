import { UserRole } from 'types/userRole';

const { ADMIN } = UserRole;

const Enumeration = {
  USERS_MANAGE: 'USERS_MANAGE',
};

const Access = {
  USERS_MANAGE: [ADMIN],
};

export { Access, Enumeration };
