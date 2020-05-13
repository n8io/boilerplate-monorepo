module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/npm', { npmPublish: false }],
    '@semantic-release/changelog',
    '@semantic-release/git',
  ],
};
