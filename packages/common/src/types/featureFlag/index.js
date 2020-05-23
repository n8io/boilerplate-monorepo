import { isEnabled } from './selectors';
import { Enumeration, values } from './typedef';

const FeatureFlag = {
  ...Enumeration,
  isEnabled,
  values,
};

export { FeatureFlag };
