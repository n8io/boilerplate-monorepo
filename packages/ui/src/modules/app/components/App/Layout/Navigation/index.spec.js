import React from 'react';
import { render } from 'testHelpers';
import { Navigation } from '.';

jest.mock('shared/useAuth');
jest.mock('./AuthLink', () => ({
  AuthLink: (props) => <x-AuthLink {...props} />,
}));
jest.mock('./NavLink', () => ({
  NavLink: (props) => <x-NavLink {...props} />,
}));

describe('<Navigation/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Navigation {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
