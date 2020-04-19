import { config } from 'config';
import nodemailer from 'nodemailer';
import url from 'url';

const { SMTP_CONNECTION } = config;
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

const mailer = nodemailer.createTransport(options);

export { mailer };
