import React from 'react';

const Menu = (props) => <x-Menu {...props} />;
const MenuDisclosure = (props) => <x-MenuDisclosure {...props} />;
const MenuItem = (props) => <x-MenuItem {...props} />;
const useMenuState = () => ({ hide: jest.fn().mockName('hide') });

export { Menu, MenuDisclosure, MenuItem, useMenuState };
