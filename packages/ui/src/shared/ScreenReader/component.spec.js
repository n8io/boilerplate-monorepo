import React from 'react';
import { render } from 'testHelpers';
import { ScreenReader, domTestId } from '.';

describe('<ScreenReader/>', () => {
  it('renders properly', () => {
    const defaultProps = { children: <x-child /> };
    const { getByTestId } = render(<ScreenReader {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
