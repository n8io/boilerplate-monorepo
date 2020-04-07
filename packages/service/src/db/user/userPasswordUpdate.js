const userPasswordUpdate = async ({ id, passwordHash }, context) => {
  const { User } = context.Models;

  await new User({ id }).save(
    { passwordHash },
    { method: 'update', patch: true, required: true }
  );

  return true;
};

export { userPasswordUpdate };
