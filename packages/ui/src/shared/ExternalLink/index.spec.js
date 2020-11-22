import React from 'react';
import { render } from 'testHelpers';
import { ExternalLink } from '.';

describe('<ExternalLink/>', () => {
  const children = 'TEXT';

  const defaultProps = {
    children,
    href: 'HREF',
  };

  const renderComponent = (overrides) =>
    render(<ExternalLink {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
