import { shape, string } from 'prop-types';

const propTypes = shape({
  confirmPassword: string.isRequired,
  email: string.isRequired,
  familyName: string.isRequired,
  givenName: string.isRequired,
  password: string.isRequired,
  username: string.isRequired,
});

export { propTypes };
