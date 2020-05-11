import React from 'react';
import { render } from 'testHelpers';
import { ErrorNotification } from '.';

jest.mock('../Notification');

describe('<ErrorNotification/>', () => {
  const defaultProps = {
    error: new Error('ERROR'),
    messageKey: 'MESSAGE_KEY',
  };

  const renderComponent = (overrides) =>
    render(<ErrorNotification {...defaultProps} {...overrides} />);

  test('renders an error', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders nothing without an error', () => {
    const { container } = renderComponent({ error: null });

    expect(container).toBeEmpty();
  });
});
