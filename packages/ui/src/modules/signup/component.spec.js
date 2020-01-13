import * as Hooks from '@apollo/client';
import React from 'react';
import { Mutation } from 'shared/graphql/mutation';
import { render } from 'testHelpers';
import { Signup } from './component';

jest.mock('shared/Button');
jest.mock('shared/Content');
jest.mock('shared/Page');
jest.mock('shared/useAuth');

describe('<Signup/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Signup {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useMutation = td.replace(Hooks, 'useMutation');

    td.when(useMutation(Mutation.USER_REGISTER)).thenReturn([
      jest.fn().mockName('userRegister'),
      { loading: false },
    ]);
  });

  test('renders signup page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
