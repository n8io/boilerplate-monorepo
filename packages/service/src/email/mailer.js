import { Time } from '@boilerplate-monorepo/common';
import { config } from 'config';
import { log } from 'log';
import nodemailer from 'nodemailer';
import url from 'url';
import { debuglog } from 'util';

const { EMAIL_SMTP_TIMEOUT_SECONDS, EMAIL_SMTP_URL, isTest } = config;

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

  const connectionTimeout = Time.seconds(EMAIL_SMTP_TIMEOUT_SECONDS);
  const { auth: authentication, hostname, port, protocol } = smtpUri;
  const isSecure = protocol.toLowerCase() !== 'smtp:';
  const [user, pass] = (authentication || '').split(':');
  const auth = pass && user ? { pass, user } : undefined;

  const options = {
    auth,
    connectionTimeout,
    host: hostname,
    port,
    secure: isSecure,
  };

  const mailer = nodemailer.createTransport(options);

  mailer.verify((error) => {
    if (error) {
      log.error(`Unable to connect to email via smtp`, error);
    } else {
      debuglog('✉️ Email server connection has successfully been established');
    }
  });

  return mailer;
};

const mailer = make();

export { mailer };
