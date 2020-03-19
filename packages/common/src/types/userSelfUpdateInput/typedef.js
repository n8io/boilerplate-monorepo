import { shape, string } from 'prop-types';

const propTypes = shape({
  email: string.isRequired,
  username: string.isRequired,
});

export { propTypes };
