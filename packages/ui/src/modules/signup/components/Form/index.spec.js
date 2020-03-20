import React from 'react';
import * as MutationHooks from 'shared/graphql/mutation/useUserRegister';
import { render } from 'testHelpers';
import { Form } from '.';

jest.mock('shared/forms/Form');
jest.mock('shared/forms/Input');
jest.mock('shared/forms/useForm');
jest.mock('shared/Button');
jest.mock('shared/useAuth');

describe('<Form/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Form {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserRegister = td.replace(MutationHooks, 'useUserRegister');

    td.when(useUserRegister()).thenReturn([
      jest.fn().mockName('userRegister'),
      { loading: false },
    ]);
  });

  test('renders login page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
