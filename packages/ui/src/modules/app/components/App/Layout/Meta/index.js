import { Color } from '@boilerplate-monorepo/common';
import { config } from 'config';
import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = () => {
  const { COMMIT_HASH, COMMIT_MESSAGE, RELEASE } = config;

  return (
    <Helmet>
      <meta name="theme-color" content={Color.PRIMARY} />
      <meta name="version" content={RELEASE} />
      {COMMIT_HASH && (
        <meta
          content={COMMIT_HASH}
          data-testid="commit"
          message={COMMIT_MESSAGE}
          name="commit"
          url={`https://github.com/n8io/boilerplate-monorepo/commit/${COMMIT_HASH}`}
        />
      )}
    </Helmet>
  );
};

export { Meta };
