import React from 'react';
import * as MutationHooks from 'shared/graphql/mutation/useUserSelfSecurityUpdate';
import { render } from 'testHelpers';
import { Form } from '.';

jest.mock('shared/Button');
jest.mock('shared/ErrorNotification');
jest.mock('shared/SuccessNotification');
jest.mock('shared/forms/Form');
jest.mock('shared/forms/PasswordInput');
jest.mock('shared/forms/SubmitButton');
jest.mock('shared/forms/useForm');
jest.mock('shared/Button');
jest.mock('shared/useAuth');

describe('<Form/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Form {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserSelfSecurityUpdate = td.replace(
      MutationHooks,
      'useUserSelfSecurityUpdate'
    );

    td.when(useUserSelfSecurityUpdate()).thenReturn([
      jest.fn().mockName('userSelfSecurityUpdate'),
      { loading: false },
    ]);
  });

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
