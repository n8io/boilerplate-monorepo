import React from 'react';
import { render } from 'testHelpers';
import { EllipsiedText } from '.';

describe('<EllipsiedText/>', () => {
  const defaultProps = {
    children: 'CHILDREN',
  };

  const renderComponent = (overrides) =>
    render(<EllipsiedText {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
