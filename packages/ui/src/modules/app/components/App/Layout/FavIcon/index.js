import { Color } from '@boilerplate-monorepo/common';
import { DisplayMode, Site, Theme } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import Helmet from 'react-helmet';
import { useTheme } from 'shared/useTheme';

const baseUrl =
  'https://ui-avatars.com/api/?rounded=true&bold=true&size=32&font-size=0.75';
const hexColorToParam = hexColor => hexColor.replace('#', '').substring(0, 6);
const themeToIconUrl = displayMode => {
  const url = new URL(baseUrl);
  const [firstInitial] = Site.name.split('');

  let background = hexColorToParam(Color.PRIMARY);
  let color = hexColorToParam(Color.WHITE);

  if (displayMode === DisplayMode.DARK) {
    [background, color] = [color, background];
  }

  url.searchParams.set('background', background);
  url.searchParams.set('color', color);
  url.searchParams.set('name', firstInitial);

  return url.toString();
};

const FavIcon = () => {
  const { theme } = useTheme();
  const displayMode = Theme.displayMode(theme);

  return (
    <Helmet>
      <link rel="shortcut icon" href={themeToIconUrl(displayMode)} />
    </Helmet>
  );
};

export { FavIcon };
