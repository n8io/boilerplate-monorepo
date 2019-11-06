import React from 'react';
import { Font } from 'types/font';

const domTestId = 'FontLoader';

const href = `https://fonts.googleapis.com/css?family=${encodeURI(
  Font.numeralsFamilyName
)}:400,700|${encodeURI(Font.familyName)}`;

const FontLoader = () => <link href={href} rel="stylesheet" />;

export { domTestId, FontLoader };
