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

  const renderComponent = (overrides) =>
    render(<ErrorPage {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  describe('when debug is enabled', () => {
    const isDebug = true;

    test('shows debug info', () => {
      const { getByTestId } = renderComponent({ isDebug });

      expect(getByTestId(DataTestId.DEBUG)).not.toBeNull();
    });
  });

  describe('when telemetry is enabled', () => {
    const isTelemetryEnabled = true;

    test('shows additional information text', () => {
      const { getByText } = renderComponent({ isTelemetryEnabled });

      expect(getByText('t(provideAdditionalFeedback)')).not.toBeNull();
    });

    test('shows a tell us more button', () => {
      const { getByText } = renderComponent({ isTelemetryEnabled });

      expect(getByText('t(tellUsMore)')).not.toBeNull();
    });
  });
});
