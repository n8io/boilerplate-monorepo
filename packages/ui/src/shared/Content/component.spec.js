import React from 'react';
import { render } from 'testHelpers';
import { domTestId, Content } from '.';

describe('<Content/>', () => {
  it('renders properly', () => {
    const defaultProps = { children: <x-child /> };
    const { getByTestId } = render(<Content {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
