import { User } from '@boilerplate-monorepo/common';
import { config } from 'config';
import { bodyToHtml, userToFormattedEmailAddress } from 'email/selectors';
import { mailer as Mailer } from '../../mailer';
import { passwordResetSuccess } from './index';

const { EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME } = config;

describe('passwordResetSuccess', () => {
  const user = User.apiExample();
  const input = { user };
  const from = `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`;
  const subject = '💚 Your password has been reset';
  const to = userToFormattedEmailAddress(user);

  let sendMail = null;

  beforeEach(() => {
    sendMail = td.replace(Mailer, 'sendMail');
  });

  test('should send email', async () => {
    const body = await passwordResetSuccess(input);

    td.verify(
      sendMail({
        from,
        html: bodyToHtml(body),
        subject,
        to,
      })
    );
  });

  test('email body should match snapshot', async () => {
    const body = await passwordResetSuccess(input);

    expect(body).toMatchSnapshot();
  });
});
