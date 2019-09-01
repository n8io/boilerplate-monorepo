import { noop } from '@puttingpoker/common';
import { func, shape, string } from 'prop-types';

const propTypes = shape({
  label: string.isRequired,
  onClick: func.isRequired,
  text: string.isRequired,
});

const example = () => ({
  label: 'LABEL',
  onClick: noop,
  text: 'TEXT',
});

export const MenuOption = {
  example,
  propTypes,
};
