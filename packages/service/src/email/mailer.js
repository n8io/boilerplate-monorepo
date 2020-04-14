import nodemailer from 'nodemailer';
import { ProcessEnvKeys } from 'types/processEnv';
import url from 'url';

// eslint-disable-next-line no-process-env
const smtpUri = url.parse(process.env[ProcessEnvKeys.SMTP_CONNECTION]);
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
