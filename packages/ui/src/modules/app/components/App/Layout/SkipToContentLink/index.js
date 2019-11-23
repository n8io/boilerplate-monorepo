import { SkipToDestination } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { SkipLink } from 'shared/SkipLink';
import { useTranslate } from 'shared/useTranslate';

const SkipToContentLink = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return <SkipLink id={SkipToDestination.MAIN} text={t('skipToContentLink')} />;
};

export { SkipToContentLink };
