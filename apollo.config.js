const dotenv = require('dotenv');

dotenv.config();

// eslint-disable-next-line no-process-env
const { HOST = 'localhost', PORT = 4000, PROTOCOL = 'http' } = process.env;

module.exports = {
  client: {
    service: {
      name: 'local',
      url: `${PROTOCOL}://${HOST}:${PORT}/graphql`,
    },
  },
};
