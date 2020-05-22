import { useContext } from 'react';
import { Context } from 'types/context';

const useFeatureFlags = () => useContext(Context.FEATURE_FLAGS);

export { useFeatureFlags };
