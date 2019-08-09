import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';

const domTestId = 'FontLoader';

const FontLoader = () => {
  const theme = useContext(ThemeContext);
  const { site } = theme;
  const { fontFamilyName, fontFamilyNumeralsName } = site;

  return (
    <style data-testid={domTestId}>
      @import url(
      {`https://fonts.googleapis.com/css?family=${encodeURI(
        fontFamilyNumeralsName
      )}:400,700|${encodeURI(fontFamilyName)}&display=swap`}
      );
    </style>
  );
};

export { domTestId, FontLoader };
