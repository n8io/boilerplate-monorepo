module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  processors: ['stylelint-processor-styled-components'],
  rules: {
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
    'prettier/prettier': true,
  },
};
