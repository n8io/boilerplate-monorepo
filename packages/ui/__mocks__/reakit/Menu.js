import React from 'react';

const Menu = (props) => <x-Menu {...props} />;
const MenuButton = (props) => <x-MenuButton {...props} />;
const MenuItem = (props) => <x-MenuItem {...props} />;
const useMenuState = () => ({ hide: jest.fn().mockName('hide') });

export { Menu, MenuButton, MenuItem, useMenuState };
