import { unless, pipe, isNil, toLower, trim } from 'ramda';
import { Utils } from 'utils';

const uiToApi = unless(isNil, pipe(toLower, trim));

const toApiMasked = api => {
  const parts = api.split('@');
  const [user, domain] = parts;
  const [firstOne] = user;
  const lastFive = domain.slice(-5);
  const lead = firstOne.padEnd(user.length, '*');
  const tail = lastFive.padStart(domain.length, '*');

  return `${lead}@${tail}`;
};

const apiToMasked = pipe(uiToApi, unless(Utils.isNullOrEmpty, toApiMasked));

export { apiToMasked, uiToApi };
