import React from 'react';
import { render } from 'testHelpers';
import { WarnNotification } from '.';

jest.mock('../Notification');

describe('<WarnNotification/>', () => {
  const defaultProps = { message: 'MESSAGE' };

  const renderComponent = (overrides) =>
    render(<WarnNotification {...defaultProps} {...overrides} />);

  test('renders an info notification', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
