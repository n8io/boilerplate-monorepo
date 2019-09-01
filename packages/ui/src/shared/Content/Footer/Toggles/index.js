import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { DisplayMode } from 'types/displayMode';
import { useTheme } from '../../../useTheme';
import { Language } from './Language';
import { Theme } from './Theme';

const domTestId = 'Toggles';

const Styled = styled.section`
  display: grid;
  font-size: 0.75rem;
  grid-gap: 0.5rem;
  grid-template-columns: auto auto;
`;

const Toggles = () => {
  const { theme, updateTheme } = useTheme();
  const { mode } = theme;

  const onToggleTheme = useCallback(() => {
    if (mode === DisplayMode.DARK) {
      return updateTheme({ ...theme, mode: DisplayMode.LIGHT });
    }

    return updateTheme({ ...theme, mode: DisplayMode.DARK });
  }, [mode, theme, updateTheme]);

  return (
    <Styled data-testid={domTestId}>
      <Language />
      <Theme isDarkMode={mode === DisplayMode.DARK} onToggle={onToggleTheme} />
    </Styled>
  );
};

export { Toggles, domTestId };
