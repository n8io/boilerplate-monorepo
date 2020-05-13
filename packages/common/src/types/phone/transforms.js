import { unless, pipe } from 'ramda';
import { Utils } from 'utils';

// eslint-disable-next-line complexity,max-statements
const uiToApi = (raw) => {
  if (!raw) return raw;

  const stringNumber = raw.toString() || '';

  // Check to make sure there are at least two numbers
  if (stringNumber.match(/\d{2,}/gu)) {
    const cleanedUpNumber = stringNumber.replace(/[-() ]/gu, '');

    // Check if it's less than 10 digits
    if (cleanedUpNumber.length < 10) {
      return null;
      // Check if equal to 10
    }

    if (cleanedUpNumber.length === 10) {
      return `+1${cleanedUpNumber}`;
      // Check if it has country code
    }

    if (cleanedUpNumber.length > 10) {
      const countryCode = '+1';

      if (cleanedUpNumber.slice(0, 2) === countryCode) {
        return cleanedUpNumber;
      }
    }
  }

  return null;
};

const toApiMasked = (phone) => {
  if (!phone) return phone;

  const number = phone.replace(/[^0-9]+/gu, '');
  const [, firstOne] = number;
  const lastFour = number.slice(-4);

  return `+1(${firstOne}**)***-${lastFour}`;
};

const apiToMasked = (phone) => {
  if (!phone) return phone;

  return pipe(uiToApi, unless(Utils.isNullOrEmpty, toApiMasked))(phone);
};

export { apiToMasked, uiToApi };
