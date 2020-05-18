import { UserSnapshot } from '@boilerplate-monorepo/common';
import React from 'react';
import { render } from 'testHelpers';
import { UserList } from '.';

describe('<UserList/>', () => {
  const defaultProps = {
    users: [UserSnapshot.uiExample()],
  };

  const renderComponent = (overrides) =>
    render(<UserList {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
