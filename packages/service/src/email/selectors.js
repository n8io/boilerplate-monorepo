const userToFormattedEmailAddress = ({ email, givenName, familyName }) =>
  `${givenName} ${familyName} <${email}>`;

export { userToFormattedEmailAddress };
