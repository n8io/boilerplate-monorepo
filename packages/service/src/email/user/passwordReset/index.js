import { config } from 'config';
import { logFactory } from 'log/logFactory';
import { Password } from 'types/password';
import { mailer } from '../../mailer';
import { userToFormattedEmailAddress } from '../../selectors';

const {
  PASSWORD_RESET_EMAIL_FROM_ADDRESS,
  PASSWORD_RESET_EMAIL_FROM_NAME,
  UI_HOST_URI,
} = config;

const debugLog = logFactory({
  method: 'passwordReset',
  module: 'email/user/passwordReset',
});

const passwordReset = async ({ passwordResetToken, user }) => {
  const from = `${PASSWORD_RESET_EMAIL_FROM_NAME} <${PASSWORD_RESET_EMAIL_FROM_ADDRESS}>`;
  const to = userToFormattedEmailAddress(user);
  const resetLink = `${UI_HOST_URI}/account/recovery/reset/${passwordResetToken}`;

  await mailer.sendMail({
    from,
    html: `Please click the link below to reset your password:<br/><br/><a href="${resetLink}">Reset your password</a><br/><br/><i>Please note that this link will expire after ${Password.RESET_TOKEN_EXPIRATION_IN_MINUTES} minutes.</i>`,
    subject: '🔐 Password Reset',
    to,
  });

  debugLog(`✅ Successfully sent password reset email to ${to}`);
};

export { passwordReset };
