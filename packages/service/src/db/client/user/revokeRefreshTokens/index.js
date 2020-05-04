import { Models } from 'models';

const revokeRefreshTokens = id =>
  Models.User.forge({ id })
    .fetch()
    .then(model => {
      const currentTokenVersion = model.get('tokenVersion');
      const tokenVersion = (currentTokenVersion || 0) + 1;

      return model.save({ tokenVersion }, { patch: true });
    });

export { revokeRefreshTokens };
