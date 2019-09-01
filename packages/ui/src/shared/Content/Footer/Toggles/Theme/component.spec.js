import React from 'react';
import { render } from 'testHelpers';
import { domTestId, Theme } from '.';

describe('<Theme/>', () => {
  it('renders properly', () => {
    const defaultProps = {
      isDarkMode: true,
      onToggle: jest.fn().mockName('onToggle'),
    };
    const { getByTestId } = render(<Theme {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
