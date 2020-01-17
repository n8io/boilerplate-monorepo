import React from 'react';
import * as QueryHooks from 'shared/graphql/query/useUserSelf';
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

  let useUserSelf = null;

  beforeEach(() => {
    useUserSelf = td.replace(QueryHooks, 'useUserSelf');
  });

  test('renders properly', () => {
    td.when(useUserSelf()).thenReturn({
      data: { email: 'EMAIL' },
      loading: false,
    });

    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders null on error', () => {
    td.when(useUserSelf()).thenReturn({ error: {} });

    const { container } = renderComponent();

    expect(container.firstChild).toBeNull();
  });

  test('renders loader when loading', () => {
    td.when(useUserSelf()).thenReturn({ loading: true });

    const { getByTestId } = renderComponent();

    expect(getByTestId('loader')).not.toBeNull();
  });
});
