import React from 'react';
import { render } from 'testHelpers';
import { domTestId, ToggleButton } from '.';

describe('<ToggleButton/>', () => {
  it('renders properly', () => {
    const defaultProps = { 'data-testid': domTestId, text: 'TEXT' };
    const { getByTestId } = render(<ToggleButton {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
