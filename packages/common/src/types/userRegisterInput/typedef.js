import { shape, string } from 'prop-types';

const propTypes = shape({
  email: string.isRequired,
  familyName: string.isRequired,
  givenName: string.isRequired,
  passwordConfirm: string.isRequired,
  passwordNew: string.isRequired,
  username: string.isRequired,
});

export { propTypes };
