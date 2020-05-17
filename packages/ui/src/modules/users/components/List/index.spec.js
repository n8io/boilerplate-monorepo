import React from 'react';
import { render } from 'testHelpers';
import { List } from '.';

jest.mock('shared/Content');

describe('<List/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<List {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
