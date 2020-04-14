import { Font } from '@boilerplate-monorepo/ui-common';
import { toCustomProperties } from './utils/customProperty';

const fonts = {
  FONT_FAMILY: Font.familyName,
  FONT_MONO: Font.mono,
};

const { CustomProperty, styles } = toCustomProperties(fonts);

export { CustomProperty, styles };
