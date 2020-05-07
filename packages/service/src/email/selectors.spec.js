import { UserSnapshot } from '@boilerplate-monorepo/common';
import { bodyToHtml, userToFormattedEmailAddress } from './selectors';
import { minify } from './utils/minify';

describe('email selectors', () => {
  describe('userToFormattedEmailAddress', () => {
    const user = UserSnapshot.apiExample();

    test('converts a user snapshot to a formatted email address', () => {
      const actual = userToFormattedEmailAddress(user);

      expect(actual).toEqual('GIVEN_NAME FAMILY_NAME <EMAIL>');
    });
  });

  describe('bodyToHtml', () => {
    const body = 'BODY';

    test('converts body to html', () => {
      const actual = minify(bodyToHtml(body));

      const expected = minify(`
        <html>
          <body>
            ${body}
          </body>
        </html>
      `);

      expect(actual).toEqual(expected);
    });
  });
});
