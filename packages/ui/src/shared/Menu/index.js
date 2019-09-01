import { arrayOf, object, node, string } from 'prop-types';
import React from 'react';
import {
  Menu as RMenu,
  MenuDisclosure,
  MenuItem,
  useMenuState,
} from 'reakit/Menu';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { MenuOption } from 'types/menuOption';

const domTestId = 'Menu';

const makeOnClickProxy = ({ menu, onClick }) => () => {
  onClick();
  menu.hide();
};

const menuItemStyles = theme('mode', {
  [DisplayMode.DARK]: {
    backgroundColor: Color.black,
  },
  [DisplayMode.LIGHT]: {
    backgroundColor: Color.white,
  },
});

const StyledMenuItem = styled(MenuItem)`
  cursor: pointer;
  overflow-x: hidden;
  padding: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${menuItemStyles}

  &[tabindex='0'] {
    background-color: ${Color.primary};
    color: ${Color.white};
  }
`;

const renderOptions = ({ menu, options }) =>
  options.map(({ label, onClick, text, ...props }) => (
    <StyledMenuItem
      {...menu}
      {...props}
      aria-label={label}
      key={text}
      onClick={makeOnClickProxy({ menu, onClick })}
    >
      {text}
    </StyledMenuItem>
  ));

const styles = {
  boxShadow: `0 0 0 1px ${Color.primary}`,
  zIndex: 100,
};

const Menu = ({
  children,
  'data-testid': dataTestId,
  label,
  menuLabel,
  menuOptions,
  options,
}) => {
  const menu = useMenuState(menuOptions);

  return (
    <x-menu data-testid={dataTestId}>
      <MenuDisclosure {...menu} aria-label={label} as="div" tabIndex="-1">
        {children}
      </MenuDisclosure>
      <RMenu {...menu} style={styles} aria-label={menuLabel} as="ul">
        {renderOptions({ menu, options })}
      </RMenu>
    </x-menu>
  );
};

Menu.defaultProps = {
  'data-testid': domTestId,
  menuOptions: undefined,
};

Menu.propTypes = {
  children: node.isRequired,
  'data-testid': string,
  label: string.isRequired,
  menuLabel: string.isRequired,
  menuOptions: object,
  options: arrayOf(MenuOption.propTypes.isRequired).isRequired,
};

export { Menu, domTestId };
