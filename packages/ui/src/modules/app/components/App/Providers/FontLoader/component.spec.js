import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { Theme } from 'types/theme';
import { domTestId, FontLoader } from '.';

describe('<FontLoader/>', () => {
  const theme = Theme.example();
  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <FontLoader />
    </ThemeProvider>
  );
  const snapshot = getByTestId(domTestId);

  it('renders properlsy', () => {
    expect(snapshot).toMatchSnapshot();
  });
});
