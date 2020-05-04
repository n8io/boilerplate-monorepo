const dotenv = require('dotenv');

dotenv.config();

// eslint-disable-next-line no-process-env
const { HOST = 'local.host', PORT = 4000, PROTOCOL = 'https' } = process.env;

module.exports = {
  client: {
    includes: ['./packages/{service,ui}/src/**/*.js'],
    service: {
      name: 'local',
      url: `${PROTOCOL}://${HOST}:${PORT}/graphql`,
    },
  },
};
