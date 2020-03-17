import { shape, string } from 'prop-types';

const propTypes = shape({
  password: string.isRequired,
  username: string.isRequired,
});

export { propTypes };
