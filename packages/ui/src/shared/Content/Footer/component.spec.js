import React from 'react';
import { render } from 'testHelpers';
import { domTestId, Footer } from '.';

describe('<Footer/>', () => {
  it('renders properly', () => {
    const defaultProps = { children: <x-child /> };
    const { getByTestId } = render(<Footer {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
