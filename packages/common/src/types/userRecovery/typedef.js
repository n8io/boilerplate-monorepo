import { shape, string } from 'prop-types';

const propTypes = shape({
  emailMasked: string,
  id: string.isRequired,
});

export { propTypes };
