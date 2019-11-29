import { toCustomProperties } from './utils/customProperty';

const zIndexes = {
  Z_INDEX_FADE: '10',
  Z_INDEX_LANGUAGE_TOGGLE: '100',
  Z_INDEX_SIDE_BAR: '1000',
  Z_INDEX_SIDE_BAR_OVERLAY: '990',
  Z_INDEX_SKIP_LINK: '1000000',
};

const { CustomProperty, styles } = toCustomProperties(zIndexes);

export { CustomProperty, styles };
