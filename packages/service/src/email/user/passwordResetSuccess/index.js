import { config } from 'config';
import { logFactory } from 'log/logFactory';
import { mailer } from '../../mailer';
import { userToFormattedEmailAddress, bodyToHtml } from '../../selectors';

const { EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME, UI_HOST_URI } = config;

const debugLog = logFactory({
  method: 'passwordResetSuccess',
  module: 'email/user/passwordResetSuccess',
});

const passwordResetSuccess = async ({ user }) => {
  const from = `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`;
  const to = userToFormattedEmailAddress(user);
  const subject = '💚 Your password has been reset';
  const contactUsLink = `${UI_HOST_URI}/support`;

  const bodyStyle = `
    border-spacing: 0;
    font-family: Arial,Helvetica,sans-serif;
    margin: 0 auto;
    max-width: 600px;
    text-align: center;
    width: 100%;
  `;

  const body = `
    <div style="${bodyStyle}">
      <h1>
        Hey there ${user.givenName}, your password has been reset successfully.
      </h1>
      <p>
        As a security measure we thought it would be a good idea to let you know that your password was reset a few seconds ago.
      </p>
      <p>
        <i>
          If you didn’t ask to reset your password, please <a href="${contactUsLink}">contact us</a> immediately.
        </i>
      </p>
    </div>
  `;

  const html = bodyToHtml(body);

  await mailer.sendMail({
    from,
    html,
    subject,
    to,
  });

  debugLog(`✅ Successfully sent password reset success email to ${to}`);

  return body;
};

export { passwordResetSuccess };
