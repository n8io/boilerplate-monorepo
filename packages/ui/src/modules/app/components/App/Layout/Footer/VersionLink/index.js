import { config } from 'config';
import React from 'react';
import { ExternalLink } from 'shared/ExternalLink';

const COMMIT_BASE_URL = 'https://github.com/n8io/boilerplate-monorepo/commit';

const RELEASE_BASE_URL =
  'https://github.com/n8io/boilerplate-monorepo/releases/tag';

const VersionLink = () => {
  const { COMMIT_HASH, RELEASE } = config;

  if (COMMIT_HASH) {
    const commitUrl = `${COMMIT_BASE_URL}/${COMMIT_HASH}`;

    return <ExternalLink href={commitUrl}>{COMMIT_HASH}</ExternalLink>;
  }

  const releaseUrl = `${RELEASE_BASE_URL}/${RELEASE}`;

  return <ExternalLink href={releaseUrl}>{RELEASE}</ExternalLink>;
};

export { VersionLink };
