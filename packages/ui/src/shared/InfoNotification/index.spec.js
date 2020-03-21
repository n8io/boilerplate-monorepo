import React from 'react';
import { render } from 'testHelpers';
import { InfoNotification } from '.';

jest.mock('../Notification');

describe('<InfoNotification/>', () => {
  const defaultProps = { message: 'MESSAGE' };

  const renderComponent = overrides =>
    render(<InfoNotification {...defaultProps} {...overrides} />);

  test('renders an info notification', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
