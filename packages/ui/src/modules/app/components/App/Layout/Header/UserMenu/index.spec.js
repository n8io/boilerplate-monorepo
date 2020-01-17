import React from 'react';
import { render } from 'testHelpers';
import { UserMenu } from '.';

jest.mock('./Avatar', () => ({
  Avatar: props => <x-Avatar {...props} />,
}));
jest.mock('./Navigation', () => ({
  Navigation: props => <x-Navigation {...props} />,
}));
jest.mock('shared/Breakpoints/GreaterThanMobile');
jest.mock('shared/Breakpoints/Mobile');
jest.mock('shared/useAuth');

describe('<UserMenu/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<UserMenu {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
