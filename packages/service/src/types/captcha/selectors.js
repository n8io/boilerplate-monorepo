import { config } from 'config';
import https from 'https';
import querystring from 'querystring';

const { CAPTCHA_SECRET } = config;

const isTokenValid = token =>
  new Promise((resolve, reject) => {
    const data = querystring.stringify({
      response: token,
      secret: CAPTCHA_SECRET,
    });

    const options = {
      headers: {
        'content-length': Buffer.byteLength(data),
        'content-type': 'application/x-www-form-urlencoded',
      },
      host: 'hcaptcha.com',
      method: 'POST',
      path: '/siteverify',
    };

    const request = https.request(options, response => {
      response.setEncoding('utf8');

      let buffer = '';

      response
        .on('error', reject)
        .on('data', chunk => (buffer += chunk))
        .on('end', () => resolve(JSON.parse(buffer)));
    });

    request.on('error', reject);
    request.write(data);
    request.end();
  });

export { isTokenValid };
