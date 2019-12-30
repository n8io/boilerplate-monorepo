import React from 'react';
import { render } from 'testHelpers';
import { Footer } from '.';

jest.mock('./Toggles', () => ({
  Toggles: props => <x-Toggles {...props} />,
}));

describe('<Footer/>', () => {
  const defaultProps = {
    children: <x-child />,
  };

  const renderComponent = overrides =>
    render(<Footer {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
