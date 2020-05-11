import React from 'react';
import { render } from 'testHelpers';
import { HiddenInput } from '.';

describe('<HiddenInput/>', () => {
  const defaultProps = {
    name: 'NAME',
  };

  const renderComponent = (overrides) =>
    render(<HiddenInput {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
