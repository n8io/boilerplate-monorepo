import React from 'react';
import { render } from 'testHelpers';
import { FormDevTool } from '.';

describe('<FormDevTool/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<FormDevTool {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
