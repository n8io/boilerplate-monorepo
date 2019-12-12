import React from 'react';
import { render } from 'testHelpers';
import { Language } from 'types/language';
import { LanguageToggle } from '.';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: jest.fn().mockName('changeLanguage'),
    },
    t: jest.fn().mockName('t'),
  }),
}));

describe('<LanguageToggle/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<LanguageToggle {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    td.replace(Language, 'values', ['en', 'dev']);

    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
