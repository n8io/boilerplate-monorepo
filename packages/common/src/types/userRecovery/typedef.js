import { shape, string } from 'prop-types';

const propTypes = shape({
  email: string,
  id: string.isRequired,
});

export { propTypes };
