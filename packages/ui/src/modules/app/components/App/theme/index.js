import { mergeDeepRight } from 'ramda';
import { defaults } from './defaults';

const Theme = {
  default: defaults,
  light: mergeDeepRight(defaults, {
    site: {
      backgroundColor: 'orange',
    },
  }),
};

export { Theme };
