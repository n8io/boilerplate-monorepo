import { useContext } from 'react';
import { Context } from 'types/context';

const useTheme = () => useContext(Context.THEME_SWITCHER);

export { useTheme };
