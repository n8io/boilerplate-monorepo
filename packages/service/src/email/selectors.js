const userToFormattedEmailAddress = ({ email, givenName, familyName }) =>
  `${givenName} ${familyName} <${email}>`;

const bodyToHtml = (body) => `
  <html>
    <body>
      ${body}
    </body>
  </html>
`;

export { bodyToHtml, userToFormattedEmailAddress };
