import { LocalStorage } from '@boilerplate-monorepo/ui-common';
import { SplitFactory } from '@splitsoftware/splitio-react';
import { config } from 'config';
import { node } from 'prop-types';
import React from 'react';

const LOCALHOST_KEY = 'localhost';

const { SPLIT_IO_API_KEY: authorizationKey = LOCALHOST_KEY } = config;

const makeFeatures = () => {
  const { isDevelopment } = config;

  if (!isDevelopment || authorizationKey !== LOCALHOST_KEY) return undefined;

  const json = localStorage.getItem(LocalStorage.FEATURES);

  if (!json) return undefined;

  const features = JSON.parse(json);

  // eslint-disable-next-line no-console
  console.info(
    '👋 Heads up, were using a feature flags from local storage. Remote flags are not being used.'
  );

  return features;
};

const Features = ({ children }) => {
  const key = 'anonymous';
  const sdkConfig = {
    core: { authorizationKey, key },
    features: makeFeatures(),
  };

  return <SplitFactory config={sdkConfig}>{children}</SplitFactory>;
};

Features.propTypes = {
  children: node.isRequired,
};

export { Features };
