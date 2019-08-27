import React from 'react';
import { Font } from 'types/font';

const domTestId = 'FontLoader';

const FontLoader = () => (
  <style data-testid={domTestId}>
    @import url(
    {`https://fonts.googleapis.com/css?family=${encodeURI(
      Font.numeralsFamilyName
    )}:400,700|${encodeURI(Font.familyName)}&display=swap`}
    );
  </style>
);

export { domTestId, FontLoader };
