import { CustomProperty as BaseUnitCustomProperty } from './baseUnit';
import { toCustomProperties } from './utils/customProperty';

const layouts = {
  LAYOUT_HEADER_HEIGHT: `calc(${BaseUnitCustomProperty.BASE_UNIT} * 2.75)`,
  LAYOUT_MAIN_BREADCRUMB_HEIGHT: `calc((${BaseUnitCustomProperty.BASE_UNIT} * 2) - 1px)`,
  LAYOUT_MAIN_FOOTER_HEIGHT: `calc(${BaseUnitCustomProperty.BASE_UNIT} * 2.25)`,
  LAYOUT_MAIN_HEADER_HEIGHT: `calc(${BaseUnitCustomProperty.BASE_UNIT} * 2.75)`,
};

const { CustomProperty, styles } = toCustomProperties(layouts);

export { CustomProperty, styles };
