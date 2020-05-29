import { FeatureFlag } from '@boilerplate-monorepo/common';
import { node, oneOf, object } from 'prop-types';
import { useFeatureFlag } from 'shared/useFeatureFlag';

const Feature = ({ children, flag, options }) => {
  const { data, isLoading } = useFeatureFlag(flag, options);

  if (isLoading && !data) return null;

  if (FeatureFlag.isEnabled(data)) return children;

  return null;
};

Feature.defaultProps = {
  options: undefined,
};

Feature.propTypes = {
  children: node.isRequired,
  flag: oneOf(FeatureFlag.values).isRequired,
  options: object,
};

export { Feature };
