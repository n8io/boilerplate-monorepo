import React from 'react';
import { render } from 'testHelpers';
import { Route } from 'types/route';
import { NavLink } from '.';

describe('<NavLink/>', () => {
  const defaultProps = {
    onClick: jest.fn().mockName('onClick'),
    route: Route.example(),
  };

  const renderComponent = overrides =>
    render(<NavLink {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
