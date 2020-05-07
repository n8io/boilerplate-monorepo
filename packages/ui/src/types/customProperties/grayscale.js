import { Color } from '@boilerplate-monorepo/common';
import { toCustomProperties } from './utils/customProperty';

const colors = {
  /* eslint-disable sort-keys */
  GRAYSCALE_WHITE: Color.WHITE,
  GRAYSCALE_WHITE_0: '#f9f9faff',
  GRAYSCALE_WHITE_1: '#eceeefff',
  GRAYSCALE_WHITE_2: '#dee1e3ff',
  GRAYSCALE_GRAY: '#cfd3d7ff',
  GRAYSCALE_GRAY_0: '#bfc5c9ff',
  GRAYSCALE_GRAY_1: '#adb4b9ff',
  GRAYSCALE_GRAY_2: '#98a1a8ff',
  GRAYSCALE_BLACK_0: '#7f8b93ff',
  GRAYSCALE_BLACK_1: '#606e79ff',
  GRAYSCALE_BLACK_2: '#374047ff',
  GRAYSCALE_BLACK: Color.BLACK,
  /* eslint-enable sort-keys */
};

const { CustomProperty, styles } = toCustomProperties(colors);

export { CustomProperty, styles };
