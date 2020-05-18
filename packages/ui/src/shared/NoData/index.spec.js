import React from 'react';
import { render } from 'testHelpers';
import { NoData } from '.';

describe('<NoData/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<NoData {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
