import React from 'react';
import { render } from 'testHelpers';
import { Logout } from '.';

jest.mock('shared/Loader');
jest.mock('shared/useAuth');

describe('<Logout/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Logout {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
