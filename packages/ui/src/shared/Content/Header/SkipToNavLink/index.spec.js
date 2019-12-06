import React from 'react';
import { render } from 'testHelpers';
import { SkipToNavLink } from '.';

describe('<SkipToNavLink/>', () => {
  const text = 't(skipToNavigationLink)';
  const defaultProps = {
    children: text,
  };

  const renderComponent = overrides =>
    render(<SkipToNavLink {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
