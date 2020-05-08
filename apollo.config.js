const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  client: {
    excludes: ['build/**', 'dist/**', '**/*.spec.js'],
    includes: [`${__dirname}/packages/ui/src/shared/graphql/**/*.js`],
    service: {
      name: 'local.host',
      skipSSLVerification: true,
      url: 'https://local.host:4000/graphql',
    },
  },
  service: {
    localSchemaFile: `${__dirname}/.graphql/schema.graphql`,
    name: 'local.host',
  },
};
