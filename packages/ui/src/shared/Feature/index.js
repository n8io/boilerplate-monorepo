import { FeatureFlag } from '@boilerplate-monorepo/common';
import { node, oneOf } from 'prop-types';
import { useFeatureFlag } from 'shared/useFeatureFlag';

const Feature = ({ children, flag }) => {
  const { data, isLoading } = useFeatureFlag(flag);

  if (isLoading && !data) return null;

  if (FeatureFlag.isEnabled(data)) return children;

  return null;
};

Feature.propTypes = {
  children: node.isRequired,
  flag: oneOf(FeatureFlag.values).isRequired,
};

export { Feature };
