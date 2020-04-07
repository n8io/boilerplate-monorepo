import { shape, string } from 'prop-types';

const propTypes = shape({
  passwordConfirm: string.isRequired,
  passwordCurrent: string.isRequired,
  passwordNew: string.isRequired,
});

export { propTypes };
