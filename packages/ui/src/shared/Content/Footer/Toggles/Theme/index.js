import { bool, func } from 'prop-types';
import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import styled from 'styled-components/macro';
import { DisplayMode } from 'types/displayMode';
import { Context, Button } from '../../../../Button';
import { useTranslate } from '../../../../useTranslate';

const Styled = styled(Button)`
  align-items: center;
  display: grid;
  justify-items: center;
  padding: 0.25rem;
  text-align: center;
  text-transform: lowercase;
`;

const Theme = ({ isDarkMode, onToggle }) => {
  const t = useTranslate({
    component: 'toggles',
    namespace: 'app',
  });

  const i18nkey = `modes.${isDarkMode ? DisplayMode.LIGHT : DisplayMode.DARK}`;

  return (
    <Styled context={Context.PRIMARY} label={t(i18nkey)} onClick={onToggle}>
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </Styled>
  );
};

Theme.propTypes = {
  isDarkMode: bool.isRequired,
  onToggle: func.isRequired,
};

export { Theme };
