import { Font } from '@boilerplate-monorepo/ui-common';
import { join, map, pipe, values } from 'ramda';
import React from 'react';

const fontFamilies = pipe(
  values,
  map(encodeURI),
  map((font) => `family=${font}:400,700`),
  join('&')
)(Font);

const href = `https://fonts.googleapis.com/css?${fontFamilies}`;

const FontLoader = () => <link href={href} rel="stylesheet" />;

export { FontLoader };
