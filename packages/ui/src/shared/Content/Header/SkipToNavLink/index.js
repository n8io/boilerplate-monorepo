import { SkipToDestination } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { SkipLink } from 'shared/SkipLink';
import { useTranslate } from 'shared/useTranslate';

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
