import { LocalStorage } from '@boilerplate-monorepo/ui-common';
import { SplitFactory } from '@splitsoftware/splitio-react';
import { config } from 'config';
import { node } from 'prop-types';
import React from 'react';
import { AnonymousId } from 'types/anonymousId';

const LOCALHOST_KEY = 'localhost';

const readAuthorizationKey = () => {
  const { SPLIT_IO_API_KEY: authorizationKey = LOCALHOST_KEY } = config;

  return authorizationKey;
};

// eslint-disable-next-line max-statements
const makeFeatures = () => {
  const { isDevelopment } = config;
  const authorizationKey = readAuthorizationKey();

  if (!isDevelopment || authorizationKey !== LOCALHOST_KEY) return undefined;

  const json = localStorage.getItem(LocalStorage.FEATURES);

  if (!json) return undefined;

  try {
    const features = JSON.parse(json);

    // eslint-disable-next-line no-console
    console.info(
      `👋 Heads up, we're using a feature flag set from local storage. Remote flags are not being used.`,
      features
    );

    return features;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.info(
      `🤷‍♂️ The feature flag set you have in local storage is not valid JSON. More details on what that JSON should look like can be found here: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#localhost-mode`
    );

    return undefined;
  }
};

const Features = ({ children }) => {
  const authorizationKey = readAuthorizationKey();

  if (!authorizationKey) return children;

  const core = { authorizationKey, key: AnonymousId.read() };
  const features = makeFeatures();
  const sdkConfig = { core, features };

  return <SplitFactory config={sdkConfig}>{children}</SplitFactory>;
};

Features.propTypes = {
  children: node.isRequired,
};

export { Features };
