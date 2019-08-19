import React, { useCallback } from 'react';
import { Button } from 'shared/Button';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { DisplayMode } from 'types/displayMode';
import { useThemeSwitcher } from '../../../Providers/Theme';

const Styled = styled.section`
  display: grid;
  font-size: 0.75rem;
  grid-gap: 0.5rem;
  grid-template-columns: auto auto;
`;

const ToggleButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  text-align: center;
  text-transform: lowercase;
  width: 4rem;
`;

const Toggles = () => {
  const t = useTranslate({
    component: 'toggles',
    namespace: 'app',
  });

  const { theme, updateTheme } = useThemeSwitcher();
  const { mode } = theme;

  const onToggleTheme = useCallback(() => {
    if (mode === DisplayMode.DARK) {
      return updateTheme({ ...theme, mode: DisplayMode.LIGHT });
    }

    return updateTheme({ ...theme, mode: DisplayMode.DARK });
  }, [mode, updateTheme]);

  return (
    <Styled>
      <ToggleButton
        label={t('toggleTheme')}
        text={t('theme')}
        onClick={onToggleTheme}
      ></ToggleButton>
    </Styled>
  );
};

export { Toggles };
