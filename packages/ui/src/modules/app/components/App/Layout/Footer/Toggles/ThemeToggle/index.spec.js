import React from 'react';
import { render } from 'testHelpers';
import { ThemeToggle } from '.';

jest.mock('../ToggleButton');

describe('<ThemeToggle/>', () => {
  const defaultProps = {
    isDarkMode: false,
    onToggle: jest.fn().mockName('onToggle'),
  };

  const renderComponent = (overrides) =>
    render(<ThemeToggle {...defaultProps} {...overrides} />);

  describe('when light mode', () => {
    test('renders properly', () => {
      const { container } = renderComponent({ isDarkMode: false });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when dark mode', () => {
    test('renders properly', () => {
      const { container } = renderComponent({ isDarkMode: true });

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
