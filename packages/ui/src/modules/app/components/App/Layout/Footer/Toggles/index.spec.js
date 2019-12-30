import React from 'react';
import { render } from 'testHelpers';
import { Toggles } from '.';

jest.mock('./LanguageToggle', () => ({
  LanguageToggle: props => <x-LanguageToggle {...props} />,
}));
jest.mock('./ThemeToggle', () => ({
  ThemeToggle: props => <x-ThemeToggle {...props} />,
}));

describe('<Toggles/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Toggles {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
