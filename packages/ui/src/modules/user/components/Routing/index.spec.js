import React from 'react';
import { render } from 'testHelpers';
import { Routing } from '.';

jest.mock('shared/AuthRoute');

describe('<Routing/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Routing {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
