import React from 'react';
import { render } from 'testHelpers';
import { Form } from '.';

describe('<Form/>', () => {
  const defaultProps = {
    children: 'CHILDREN',
    handleSubmit: jest.fn().mockName('handleSubmit'),
    onSubmit: jest.fn().mockName('onSubmit'),
  };

  const renderComponent = overrides =>
    render(<Form {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
