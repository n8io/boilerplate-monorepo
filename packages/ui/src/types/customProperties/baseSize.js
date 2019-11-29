import { toCustomProperties } from './utils/customProperty';

const BASE_SIZE = 1.0675;

const baseSizes = {
  BASE_SIZE,
};

const { CustomProperty, styles } = toCustomProperties(baseSizes);

export { CustomProperty, styles };
