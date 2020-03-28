module.exports = {
  plugins: [
    ['module-resolver', { root: ['./src'] }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [['@babel/env', { targets: { node: 'current' } }]],
};
