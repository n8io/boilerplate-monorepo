import { config } from 'config';
import { log } from 'log';
import nodemailer from 'nodemailer';
import url from 'url';

const { EMAIL_SMTP_URL, isTest } = config;

// eslint-disable-next-line complexity,max-statements
const make = () => {
  if (!EMAIL_SMTP_URL) {
    return {
      sendMail: (props) =>
        log.warn(
          'EMAIL_SMTP_URL was not set so emails will not be sent',
          props
        ),
    };
  }

  if (isTest) {
    return {
      sendMail: (props) =>
        log.warn(
          'Currently running in a test environment. Emails will not be sent',
          props
        ),
    };
  }

  const smtpUri = url.parse(EMAIL_SMTP_URL);

  const { auth: authentication, hostname, port, protocol } = smtpUri;
  const isSecure = protocol.toLowerCase() !== 'smtp:';
  const [user, pass] = (authentication || '').split(':');
  const auth = pass && user ? { pass, user } : undefined;

  const options = {
    auth,
    host: hostname,
    port,
    secure: isSecure,
  };

  return nodemailer.createTransport(options);
};

const mailer = make();

export { mailer };
