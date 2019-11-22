import React from 'react';
import { SkipLink } from 'shared/SkipLink';
import { useTranslate } from 'shared/useTranslate';
import { SkipToDestination } from 'types/skipToDestination';

const SkipToContentLink = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return <SkipLink id={SkipToDestination.MAIN} text={t('skipToContentLink')} />;
};

export { SkipToContentLink };
