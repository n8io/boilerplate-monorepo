import React from 'react';
import { render } from 'testHelpers';
import { DataTestId, ErrorPage } from '.';

describe('<ErrorPage/>', () => {
  const defaultProps = {
    isDebug: false,
    isTelemetryEnabled: false,
    message: 'MESSAGE',
    onFeedbackClick: jest.fn().mockName('onFeedbackClick'),
  };

  const renderComponent = overrides =>
    render(<ErrorPage {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  test('has debug info when enabled', () => {
    const { getByTestId } = renderComponent({ isDebug: true });

    expect(getByTestId(DataTestId.DEBUG)).not.toBeNull();
  });

  test('has tell us more button when telemetry is enabled', () => {
    const { getByText } = renderComponent({ isTelemetryEnabled: true });

    expect(getByText('t(tellUsMore)')).not.toBeNull();
  });
});
