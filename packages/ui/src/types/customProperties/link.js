import { CustomProperty as GrayscaleCustomProperty } from './grayscale';
import { CustomProperty as RoygbivCustomProperty } from './roygbiv';
import { toCustomProperties } from './utils/customProperty';

const linkColors = {
  LINK_BACKGROUND_COLOR: GrayscaleCustomProperty.GRAYSCALE_WHITE,
  LINK_COLOR: RoygbivCustomProperty.COLOR_PRIMARY,
  LINK_COLOR_HOVER: RoygbivCustomProperty.COLOR_PRIMARY_DARK,
  NAV_LINK_BACKGROUND_COLOR: GrayscaleCustomProperty.GRAYSCALE_WHITE,
  NAV_LINK_BACKGROUND_COLOR_HOVER: RoygbivCustomProperty.COLOR_PRIMARY_LIGHT,
  NAV_LINK_COLOR: RoygbivCustomProperty.COLOR_PRIMARY,
  NAV_LINK_COLOR_HOVER: RoygbivCustomProperty.COLOR_PRIMARY_DARK,
};

const { CustomProperty, styles } = toCustomProperties(linkColors);

export { CustomProperty, styles };
