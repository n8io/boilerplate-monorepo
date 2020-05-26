import { LocalStorage } from '@boilerplate-monorepo/ui-common';
import cuid from 'cuid';

const makeId = () => `anonymous-${cuid()}`;
const clear = () => localStorage.removeItem(LocalStorage.ANONYMOUS_ID);

const set = () => {
  const newId = makeId();

  localStorage.setItem(LocalStorage.ANONYMOUS_ID, newId);

  return newId;
};

const read = () => localStorage.getItem(LocalStorage.ANONYMOUS_ID) || set();

export const AnonymousId = {
  clear,
  read,
  set,
};
