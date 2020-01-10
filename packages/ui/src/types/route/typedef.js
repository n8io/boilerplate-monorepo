import { config } from 'config';
import { shape, string } from 'prop-types';
import { values as ramdaValues } from 'ramda';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaRegAddressBook, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { GiFireBowl } from 'react-icons/gi';
import { MdDashboard, MdPersonAdd } from 'react-icons/md';

export const SORT_PROP_NAME = 'sortOrder';

export const Enumeration = {
  ABOUT: {
    [SORT_PROP_NAME]: 10,
    exact: true,
    icon: FaRegAddressBook,
    name: 'about',
    path: '/about',
  },
  DASHBOARD: {
    [SORT_PROP_NAME]: 1,
    exact: true,
    icon: MdDashboard,
    name: 'dashboard',
    path: '/',
  },
  LOGIN: {
    icon: FaSignInAlt,
    name: 'login',
    path: '/login',
  },
  LOGOUT: {
    icon: FaSignOutAlt,
    name: 'logout',
    path: '/logout',
  },
  NOT_FOUND: {
    [SORT_PROP_NAME]: config.isDebug ? 100 : undefined,
    icon: AiOutlineFileSearch,
    name: 'notFound',
    path: '/404',
  },
  ROOT: {
    exact: true,
    name: 'root',
    path: '/',
  },
  SIGNUP: {
    icon: MdPersonAdd,
    name: 'signup',
    path: '/signup',
  },
  TEST_PAGE: {
    [SORT_PROP_NAME]: config.isDebug ? 100 : undefined,
    exact: true,
    icon: GiFireBowl,
    name: 'testPage',
    path: '/test',
  },
};

export const propTypes = shape({
  name: string.isRequired,
  path: string.isRequired,
});

export const values = ramdaValues(Enumeration);
