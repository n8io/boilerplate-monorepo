import React from 'react';
import { SkipLink } from 'shared/SkipLink';
import { useTranslate } from 'shared/useTranslate';
import { SkipToDestination } from 'types/skipToDestination';

const SkipToNavLink = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return (
    <SkipLink
      id={SkipToDestination.NAVIGATION}
      text={t('skipToNavigationLink')}
    />
  );
};

export { SkipToNavLink };
