import React, { useCallback, useState } from 'react';
import { Button } from 'shared/Button';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { DisplayMode } from 'types/displayMode';
import { Layout } from 'types/layout';
import { useThemeSwitcher } from '../../AppProviders/Theme';
import { Content, domId } from './Content';
import { Nav } from './Nav';
import { GridTemplateArea } from './gridTemplateArea';

const domTestId = 'Main';

const { DARK, LIGHT } = DisplayMode;
const { CONTENT, NAVIGATION } = GridTemplateArea;
const { COMFORTABLE, COMPACT, DEFAULT } = Layout;
const layouts = [DEFAULT, COMFORTABLE, COMPACT];

// eslint-disable-next-line max-statements
const Main = () => {
  const [layoutIndex, setLayoutIndex] = useState(1);
  const t = useTranslate({
    component: 'main',
    namespace: 'app',
  });
  const { theme, updateTheme } = useThemeSwitcher();
  const { layout, mode } = theme;

  const onModeToggle = useCallback(
    () =>
      updateTheme({
        ...theme,
        mode: mode === DARK ? LIGHT : DARK,
      }),
    [updateTheme]
  );

  const onLayoutToggle = useCallback(() => {
    setLayoutIndex((layoutIndex + 1) % layouts.length);
    updateTheme({
      ...theme,
      layout: layouts[layoutIndex],
    });
  }, [updateTheme]);

  let nextLayout = DEFAULT;

  switch (layout) {
    case COMFORTABLE:
      nextLayout = 'Compact';
      break;
    case COMPACT:
      nextLayout = 'Default';
      break;
    default:
      nextLayout = 'Comfortable';
      break;
  }

  const Ctas = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0.5rem;
    grid-template-columns: auto auto;
  `;

  const Styled = styled.main`
    display:grid;
    grid-template-areas: '${NAVIGATION}' '${CONTENT}'; 
    grid-template-columns: 10rem 1fr;
    grid-template-rows: 1fr;
  `;

  return (
    <Styled data-testid={domTestId}>
      <Nav />
      <Content>
        <Ctas>
          <Button onClick={onModeToggle}>
            {mode === LIGHT ? t('switchToDarkMode') : t('switchToLightMode')}
          </Button>
          <Button onClick={onLayoutToggle}>Switch to {nextLayout} Mode</Button>
        </Ctas>
        <pre>{JSON.stringify({ layout, mode }, null, 2)}</pre>
      </Content>
    </Styled>
  );
};

export { domId, domTestId, Main };
