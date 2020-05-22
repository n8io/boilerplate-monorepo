import { equals } from 'ramda';
import { FeatureFlagValue } from 'types/featureFlagValue';

const isEnabled = equals(FeatureFlagValue.ON);

export { isEnabled };
