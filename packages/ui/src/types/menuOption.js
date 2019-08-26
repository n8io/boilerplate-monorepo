import { func, shape, string } from 'prop-types';

export const propTypes = shape({
  label: string.isRequired,
  onClick: func.isRequired,
  text: string.isRequired,
});
