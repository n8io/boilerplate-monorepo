import React from 'react';
import { render } from 'testHelpers';
import { SuccessNotification } from '.';

jest.mock('../Notification');

describe('<SuccessNotification/>', () => {
  const defaultProps = {
    message: 'MESSAGE',
  };

  const renderComponent = (overrides) =>
    render(<SuccessNotification {...defaultProps} {...overrides} />);

  test('renders a success notification', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
