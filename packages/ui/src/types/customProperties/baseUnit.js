import { CustomProperty as SizeCustomProperty } from './baseSize';
import { toCustomProperties } from './utils/customProperty';

const bases = {
  BASE_UNIT: `calc(${SizeCustomProperty.BASE_SIZE} * 1rem)`,
};

const { CustomProperty, styles } = toCustomProperties(bases);

export { CustomProperty, styles };
