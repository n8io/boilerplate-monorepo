import { Color } from '@boilerplate-monorepo/common';
import { toCustomProperties } from './utils/customProperty';

const colorTypes = {
  COLOR_ERROR: Color.ERROR,
  COLOR_ERROR_DARK: Color.ERROR_DARK,
  COLOR_ERROR_LIGHT: Color.ERROR_LIGHT,
  COLOR_INFO: Color.INFO,
  COLOR_PRIMARY: Color.PRIMARY,
  COLOR_PRIMARY_DARK: Color.PRIMARY_DARK,
  COLOR_PRIMARY_LIGHT: Color.PRIMARY_LIGHT,
  COLOR_SUCCESS: Color.SUCCESS,
  COLOR_TRANSPARENT: Color.TRANSPARENT,
  COLOR_WARN: Color.WARN,
};

const { CustomProperty, styles } = toCustomProperties(colorTypes);

export { CustomProperty, styles };
