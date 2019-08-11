import React from 'react';
import { Font } from 'types/font';

const domTestId = 'FontLoader';

const { familyName, numeralsFontFamily } = Font;

const FontLoader = () => (
  <style data-testid={domTestId}>
    @import url(
    {`https://fonts.googleapis.com/css?family=${encodeURI(
      numeralsFontFamily
    )}:400,700|${encodeURI(familyName)}&display=swap`}
    );
  </style>
);

export { domTestId, FontLoader };
