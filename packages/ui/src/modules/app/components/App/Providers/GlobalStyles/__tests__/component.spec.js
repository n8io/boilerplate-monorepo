import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { Theme } from 'types/theme';
import { GlobalStyle } from '..';

jest.mock('styled-reset-advanced', () => () => '/* reset css here */');

describe('<GlobalStyle/>', () => {
  const theme = Theme.example();

  render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );

  const snapshot = document.head.querySelector('style[data-styled]');

  it('renders style in the document head properly', () => {
    expect(snapshot).toMatchSnapshot();
  });
});
