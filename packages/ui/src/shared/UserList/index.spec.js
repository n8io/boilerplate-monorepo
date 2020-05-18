import { UserSnapshot } from '@boilerplate-monorepo/common';
import React from 'react';
import { render } from 'testHelpers';
import { UserList } from '.';

jest.mock('shared/NoData');

describe('<UserList/>', () => {
  const defaultProps = {
    users: [UserSnapshot.uiExample()],
  };

  const renderComponent = (overrides) =>
    render(<UserList {...defaultProps} {...overrides} />);

  describe('when there are users', () => {
    const users = [UserSnapshot.uiExample()];

    test('renders users properly', () => {
      const { container } = renderComponent({ users });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when there are no users', () => {
    const users = [];

    test('renders no data', () => {
      const { getByTestId } = renderComponent({ users });

      expect(getByTestId('no-data')).not.toBeNull();
    });
  });
});
