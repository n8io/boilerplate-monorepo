import React from 'react';
import { render } from 'testHelpers';
import { Body } from '.';

describe('<Body/>', () => {
  const text = 'CHILDREN';
  const defaultProps = {
    children: text,
  };

  const renderComponent = (overrides) =>
    render(<Body {...defaultProps} {...overrides}></Body>);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
