import React from 'react';
import { render } from 'testHelpers';
import { Link } from '.';

describe('<Link/>', () => {
  const children = 'TEXT';
  const routeLinkProps = {
    to: '/TO',
  };
  const defaultProps = {
    ...routeLinkProps,
    children,
  };

  const renderComponent = overrides =>
    render(<Link {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
