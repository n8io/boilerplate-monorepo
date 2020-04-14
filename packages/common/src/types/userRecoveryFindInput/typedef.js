import { shape, string } from 'prop-types';

const propTypes = shape({
  account: string.isRequired,
});

export { propTypes };
