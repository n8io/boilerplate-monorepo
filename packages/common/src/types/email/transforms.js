import { unless, pipe, isNil, toLower } from 'ramda';
import { Utils } from 'utils';

const uiToApi = unless(
  isNil,
  pipe(toLower, (x) => (x ? x.trim() : x))
);

const toApiMasked = (email) => {
  const parts = email.split('@');
  const [user, domain] = parts;
  const [firstOne] = user;
  const lastFive = domain.slice(-5);
  const lead = firstOne.padEnd(user.length, '*');
  const tail = lastFive.padStart(domain.length, '*');

  return `${lead}@${tail}`;
};

const apiToMasked = (input) => {
  if (!input) return input;

  return unless(Utils.isNullOrEmpty, pipe(uiToApi, toApiMasked))(input);
};

export { apiToMasked, uiToApi };
