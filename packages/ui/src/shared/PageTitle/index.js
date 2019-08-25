import { string } from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { useTranslate } from '../useTranslate';

const PageTitle = ({ title }) => {
  const t = useTranslate();

  return (
    <Helmet>
      <title>
        {t('siteName')} :: {title}
      </title>
    </Helmet>
  );
};

PageTitle.propTypes = {
  title: string.isRequired,
};

export { PageTitle };
