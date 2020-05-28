import React from 'react';
import { render } from 'testHelpers';
import { Form } from '.';

describe('<Form/>', () => {
  const defaultProps = {
    children: 'CHILDREN',
    formState: { dirty: false },
    handleSubmit: jest.fn().mockName('handleSubmit'),
    onSubmit: jest.fn().mockName('onSubmit'),
  };

  const renderComponent = (overrides) =>
    render(<Form {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('when dirty and enabled', () => {
    const isDirty = true;
    const isLeavePromptEnabled = true;
    const formState = { dirty: isDirty };

    test('renders prompt', () => {
      const { getByTestId } = renderComponent({
        formState,
        isLeavePromptEnabled,
      });

      expect(getByTestId('prompt')).not.toBeNull();
    });
  });
});
