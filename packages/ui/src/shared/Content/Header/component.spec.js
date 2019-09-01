import React from 'react';
import { render } from 'testHelpers';
import { domTestId, Header } from '.';

jest.mock('react-focus-lock', () => ({
  // eslint-disable-next-line react/display-name
  MoveFocusInside: props => <x-move-focus-inside-mock {...props} />,
}));

describe('<Header/>', () => {
  it('renders properly', () => {
    const defaultProps = { title: 'TITLE' };
    const { getByTestId } = render(<Header {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
