import React from 'react';
import { render } from 'testHelpers';
import { SkipToContentLink } from '.';

describe('<SkipToContentLink/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<SkipToContentLink {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
