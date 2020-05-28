import { evolve, pick, pipe, unless } from 'ramda';
import { Email } from 'types/email';
import { Phone } from 'types/phone';
import { User } from 'types/user';
import { Utils } from 'utils';
import { renameKeys } from 'utils/renameKeys';

const dbToApi = unless(
  Utils.isNullOrEmpty,
  pipe(User.dbToApi, pick(['email', 'id', 'mobile']))
);

const apiToMasked = unless(
  Utils.isNullOrEmpty,
  pipe(
    evolve({
      email: Email.apiToMasked,
      mobile: Phone.apiToMasked,
    }),
    renameKeys({
      email: 'emailMasked',
      mobile: 'mobileMasked',
    })
  )
);

export { apiToMasked, dbToApi };
