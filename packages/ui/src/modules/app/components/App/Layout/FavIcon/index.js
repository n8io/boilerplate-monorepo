import { siteName } from 'i18n/en/extracted/siteName';
import React from 'react';
import Helmet from 'react-helmet';
import { useTheme } from 'shared/useTheme';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';

const baseUrl =
  'https://ui-avatars.com/api/?rounded=true&bold=true&size=128&font-size=0.75';
const hexColorToParam = hexColor => hexColor.replace('#', '');
const themeToIconUrl = displayMode => {
  const url = new URL(baseUrl);
  const [firstInitial] = siteName.split('');

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
