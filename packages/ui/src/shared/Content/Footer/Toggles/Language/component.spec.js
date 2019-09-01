import React from 'react';
import { render } from 'testHelpers';
import { Language } from '.';

describe('<Language/>', () => {
  it('renders nothing when there is one or less languages', () => {
    const defaultProps = { children: <x-child /> };
    const { container } = render(<Language {...defaultProps} />);
    const snapshot = container.firstChild;

    expect(snapshot).toMatchSnapshot();
  });
});
