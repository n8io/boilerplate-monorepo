import { shape, string } from 'prop-types';

const propTypes = shape({
  id: string.isRequired,
  token: string.isRequired,
});

export { propTypes };
