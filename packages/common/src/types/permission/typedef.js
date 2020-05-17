import { values as ramdaValues } from 'ramda';
import { UserRole } from 'types/userRole';

const { ADMIN } = UserRole;

const Enumeration = {
  USERS_MANAGE: 'USERS_MANAGE',
};

const Access = {
  USERS_MANAGE: [ADMIN],
};

const values = ramdaValues(Enumeration);

export { Access, Enumeration, values };
