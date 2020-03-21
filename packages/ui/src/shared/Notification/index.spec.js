import { LogLevel } from '@boilerplate-monorepo/common';
import React from 'react';
import { render } from 'testHelpers';
import { Notification } from '.';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn().mockName('error'),
    info: jest.fn().mockName('info'),
    success: jest.fn().mockName('success'),
    warn: jest.fn().mockName('warn'),
  },
}));

jest.mock('./LogLevelIcon');

describe('<Notification/>', () => {
  const defaultProps = {
    children: 'CHILDREN',
    type: LogLevel.INFO,
  };

  const renderComponent = overrides =>
    render(<Notification {...defaultProps} {...overrides} />);

  test('renders an error', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders nothing without an error', () => {
    const { container } = renderComponent({ error: null });

    expect(container).toBeEmpty();
  });
});
