import React from 'react';
import { render } from 'testHelpers';
import { ToggleButton } from '.';

describe('<ToggleButton/>', () => {
  const buttonProps = {
    onClick: jest.fn().mockName('onClick'),
    text: 'TEXT',
  };

  const defaultProps = {
    ...buttonProps,
  };

  const renderComponent = overrides =>
    render(<ToggleButton {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
