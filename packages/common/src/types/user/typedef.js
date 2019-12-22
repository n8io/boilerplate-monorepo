import { shape, string } from 'prop-types';

const propTypes = shape({
  email: string,
  familyName: string,
  givenName: string,
  id: string.isRequired,
  username: string.isRequired,
});

export { propTypes };
