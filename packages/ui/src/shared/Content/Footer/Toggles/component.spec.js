import React from 'react';
import { render } from 'testHelpers';
import { domTestId, Toggles } from '.';

describe('<Toggles/>', () => {
  it('renders properly', () => {
    const defaultProps = { children: <x-child /> };
    const { getByTestId } = render(<Toggles {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
