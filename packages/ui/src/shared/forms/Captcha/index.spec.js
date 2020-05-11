import React from 'react';
import { render } from 'testHelpers';
import { Captcha } from '.';

jest.mock('config', () => ({
  config: { CAPTCHA_SITE_KEY: 'CAPTCHA_SITE_KEY' },
}));

jest.mock('../HiddenInput', () => ({
  HiddenInput: (props) => <x-HiddenInput {...props} />,
}));

jest.mock('@hcaptcha/react-hcaptcha', () => ({
  __esModule: true,
  default: (props) => <x-HCaptcha {...props} />,
}));

describe('<Captcha/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Captcha {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
