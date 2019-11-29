import { CustomProperty as GrayscaleCustomProperty } from './grayscale';
import { toCustomProperties } from './utils/customProperty';

const customs = {
  CUSTOM_BORDER_COLOR: GrayscaleCustomProperty.GRAYSCALE_GRAY,
};

const { CustomProperty, styles } = toCustomProperties(customs);

export { CustomProperty, styles };
