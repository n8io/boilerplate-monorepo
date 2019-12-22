module.exports = {
  plugins: [['module-resolver', { root: ['./src'] }]],
  presets: [['@babel/env', { targets: { node: 'current' } }]],
};
