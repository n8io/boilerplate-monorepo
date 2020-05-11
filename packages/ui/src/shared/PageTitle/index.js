import { Site } from '@boilerplate-monorepo/ui-common';
import { string } from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title }) => (
  <Helmet>
    <title>
      {Site.name} :: {title}
    </title>
  </Helmet>
);

PageTitle.propTypes = {
  title: string.isRequired,
};

export { PageTitle };
