import React from 'react';
import { render } from 'testHelpers';
import { ErrorPage, domTestId } from '.';

describe('<ErrorPage/>', () => {
  const defaultProps = {
    message: 'MESSAGE',
    onFeedbackClick: jest.fn().mockName('onFeedbackClick'),
  };

  it('renders in production properly', () => {
    const { getByTestId } = render(<ErrorPage {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });

  it('should not render the error stack in production', () => {
    const { queryByTestId } = render(<ErrorPage {...defaultProps} />);
    const snapshot = queryByTestId('errorDetails');

    expect(snapshot).toBeNull();
  });
});
