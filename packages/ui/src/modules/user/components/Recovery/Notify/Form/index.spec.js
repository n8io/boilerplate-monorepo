import { UserRecovery } from '@boilerplate-monorepo/common';
import React from 'react';
import * as MutationHooks from 'shared/graphql/mutation/useUserPasswordResetRequest';
import { render } from 'testHelpers';
import { Form } from '.';

jest.mock('shared/Button');
jest.mock('shared/ErrorNotification');
jest.mock('shared/SuccessNotification');
jest.mock('shared/forms/Form');
jest.mock('shared/forms/HiddenInput');
jest.mock('shared/forms/RadioInput');
jest.mock('shared/forms/SubmitButton');

describe('<Form/>', () => {
  const defaultProps = {
    user: UserRecovery.uiExample(),
  };

  const renderComponent = (overrides) =>
    render(<Form {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserPasswordResetRequest = td.replace(
      MutationHooks,
      'useUserPasswordResetRequest'
    );

    td.when(useUserPasswordResetRequest()).thenReturn([
      jest.fn().mockName('userPasswordResetRequest'),
      { loading: false },
    ]);
  });

  test('renders login page', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
