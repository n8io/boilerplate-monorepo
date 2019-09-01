import React from 'react';
import { render } from 'testHelpers';
import { ErrorPage, domTestId } from '.';

describe('<ErrorPage/>', () => {
  it('renders in production properly', () => {
    const defaultProps = { message: 'MESSAGE' };
    const { getByTestId } = render(<ErrorPage {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });

  it('should not render the error stack in production', () => {
    const defaultProps = { message: 'MESSAGE' };
    const { queryByTestId } = render(<ErrorPage {...defaultProps} />);
    const snapshot = queryByTestId('errorDetails');

    expect(snapshot).toBeNull();
  });
});
