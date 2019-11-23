import { Font } from '@boilerplate-monorepo/ui-common';
import React from 'react';

const href = `https://fonts.googleapis.com/css?family=${encodeURI(
  Font.familyName
)}:400,700`;

const FontLoader = () => <link href={href} rel="stylesheet" />;

export { FontLoader };
