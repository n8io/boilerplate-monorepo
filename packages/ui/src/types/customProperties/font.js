import { Font } from '@boilerplate-monorepo/ui-common';
import { toCustomProperties } from './utils/customProperty';

const fonts = {
  FONT_FAMILY: Font.familyName,
};

const { CustomProperty, styles } = toCustomProperties(fonts);

export { CustomProperty, styles };
