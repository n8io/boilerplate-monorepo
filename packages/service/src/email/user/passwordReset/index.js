import { Color } from '@boilerplate-monorepo/common';
import { config } from 'config';
import { logFactory } from 'log/logFactory';
import { Password } from 'types/password';
import { mailer } from '../../mailer';
import { bodyToHtml, userToFormattedEmailAddress } from '../../selectors';

const { EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME, UI_HOST_URI } = config;

const debugLog = logFactory({
  method: 'passwordReset',
  module: 'email/user/passwordReset',
});

// eslint-disable-next-line max-statements
const passwordReset = async ({ passwordResetToken, user }) => {
  const from = `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`;
  const subject = '🔐 Password Reset';
  const to = userToFormattedEmailAddress(user);
  const resetLink = `${UI_HOST_URI}/account/recovery/reset/${passwordResetToken}`;

  const bodyStyle = `
    border-spacing: 0;
    font-family: Arial,Helvetica,sans-serif;
    margin: 0 auto;
    max-width: 600px;
    text-align: center;
    width: 100%;
  `;

  const resetButtonStyles = `
    background: ${Color.PRIMARY};
    border-bottom: solid 1px ${Color.PRIMARY};
    border-left: solid 1px ${Color.PRIMARY};
    border-radius: 3px;
    border-right: solid 1px ${Color.PRIMARY};
    border-top: solid 1px ${Color.PRIMARY};
    color: #ffffff;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.25rem;
    padding: .75rem 1.25rem;
    text-decoration: none;
    vertical-align: middle;
    white-space: normal;
    width: auto;
  `;

  const textMutedStyles = `
    opacity: 0.7;
  `;

  const body = `
    <div style="${bodyStyle}">
      <h1>Hi ${user.givenName}, let's reset your password.</h1>
      <p>
        <a href="${resetLink}" style="${resetButtonStyles}">Reset your password</a>
      </p>
      <br/>
      <p style="${textMutedStyles}">
        If you didn’t ask to reset your password, please ignore this email.
      </p>
      <p>
        <i>Note that this link will expire after ${Password.RESET_TOKEN_EXPIRATION_IN_MINUTES} minutes.</i>
      </p>
    </div>
  `;

  const html = bodyToHtml(body);

  debugLog(`📧 Sending "${subject}" email to ${to} from ${from}`);

  await mailer.sendMail({
    from,
    html,
    subject,
    to,
  });

  debugLog(`✅ Successfully sent password reset email to ${to}`);

  return body;
};

export { passwordReset };
