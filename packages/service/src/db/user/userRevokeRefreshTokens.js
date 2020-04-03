const userRevokeRefreshTokens = async (id, context) => {
  const { User } = context.Models;

  await new User({ id }).fetch().then(async model => {
    const currentTokenVersion = model.get('tokenVersion');
    const tokenVersion = currentTokenVersion + 1;

    await model.save({ tokenVersion }, { patch: true });

    return true;
  });

  return true;
};

export { userRevokeRefreshTokens };
