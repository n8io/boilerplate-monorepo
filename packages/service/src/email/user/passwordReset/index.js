import { logFactory } from 'log/logFactory';
import { Password } from 'types/password';
import { ProcessEnvKeys } from 'types/processEnv';
import { userToFormattedEmailAddress } from '../../selectors';

const {
  [ProcessEnvKeys.PASSWORD_RESET_EMAIL_FROM_ADDRESS]: PASSWORD_RESET_EMAIL_FROM_ADDRESS,
  [ProcessEnvKeys.PASSWORD_RESET_EMAIL_FROM_NAME]: PASSWORD_RESET_EMAIL_FROM_NAME,
  [ProcessEnvKeys.UI_HOST_URI]: UI_HOST_URI,
  // eslint-disable-next-line no-process-env
} = process.env;

const debugLog = logFactory({
  method: 'passwordReset',
  module: 'email/user/passwordReset',
});

const passwordReset = async ({ passwordResetToken, user }, context) => {
  const { mailer } = context;
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
