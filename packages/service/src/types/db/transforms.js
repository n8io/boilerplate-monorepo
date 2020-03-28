import { identity, isNil } from 'ramda';

const dbToApi = identity;

const apiToDb = props => {
  if (isNil(props)) return props;

  const { familyName, givenName } = props;

  if (familyName && givenName) {
    const name = `${familyName},${givenName}`.toLowerCase();

    return {
      ...props,
      name,
    };
  }

  return props;
};

export { apiToDb, dbToApi };
