import React from 'react';
import { render } from 'testHelpers';
import { domTestId, Loader } from '.';

describe('<Loader/>', () => {
  const defaultProps = {};

  it('renders properly', () => {
    const { getByTestId } = render(<Loader {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
