import React from 'react';
import { render } from 'testHelpers';
import { domTestId, Body } from '.';

describe('<Body/>', () => {
  it('renders properly', () => {
    const defaultProps = { children: <x-child /> };
    const { getByTestId } = render(<Body {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
