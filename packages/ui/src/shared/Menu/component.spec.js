import React from 'react';
import { render } from 'testHelpers';
import { MenuOption } from 'types/menuOption';
import { Menu, domTestId } from '.';

/* eslint-disable react/display-name,react/prop-types */
jest.mock('reakit/Menu', () => ({
  Menu: ({ children }) => <x-menu>{children}</x-menu>,
  MenuDisclosure: ({ children }) => (
    <x-menu-disclosure>{children}</x-menu-disclosure>
  ),
  MenuItem: ({ children }) => <x-menu-item>{children}</x-menu-item>,
  useMenuState: () => ({}),
}));
/* eslint-enable react/display-name,react/prop-types */

describe('<Menu/>', () => {
  const defaultProps = {
    children: <x-child />,
    label: 'LABEL',
    menuLabel: 'MENU_LABEL',
    options: [MenuOption.example()],
  };

  it('renders properly', () => {
    const { getByTestId } = render(<Menu {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
