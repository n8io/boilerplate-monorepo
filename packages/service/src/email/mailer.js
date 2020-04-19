import { config } from 'config';
import { log } from 'log';
import nodemailer from 'nodemailer';
import url from 'url';

const { SMTP_CONNECTION } = config;

const make = () => {
  if (!SMTP_CONNECTION) {
    return {
      sendMail: props =>
        log.warn(
          'SMTP_CONNECTION was not set so emails will not be sent',
          props
        ),
    };
  }

  const smtpUri = url.parse(SMTP_CONNECTION);

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
