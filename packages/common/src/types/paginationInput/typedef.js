import { number, shape, string } from 'prop-types';

const propTypes = shape({
  after: string,
  first: number,
});

export { propTypes };
