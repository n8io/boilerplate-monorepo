import * as Hooks from '@apollo/client';
import React from 'react';
import { Query } from 'shared/graphql/query';
import { render } from 'testHelpers';
import { Avatar } from '.';

jest.mock('shared/Muted', () => ({
  Muted: props => <x-Muted {...props} data-testid="loader" />,
}));
jest.mock('shared/Loader', () => ({
  Loader: props => <x-Loader {...props} data-testid="loader" />,
}));
jest.mock('shared/useAuth');

describe('<Avatar/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Avatar {...defaultProps} {...overrides} />);

  let useQuery = null;

  beforeEach(() => {
    useQuery = td.replace(Hooks, 'useQuery');
  });

  test('renders properly', () => {
    td.when(useQuery(Query.ME)).thenReturn({
      data: { me: { email: 'EMAIL' } },
      loading: false,
    });

    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders null on error', () => {
    td.when(useQuery(Query.ME)).thenReturn({ error: {} });

    const { container } = renderComponent();

    expect(container.firstChild).toBeNull();
  });

  test('renders loader when loading', () => {
    td.when(useQuery(Query.ME)).thenReturn({ loading: true });

    const { getByTestId } = renderComponent();

    expect(getByTestId('loader')).not.toBeNull();
  });
});
