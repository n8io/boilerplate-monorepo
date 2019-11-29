import { func } from 'prop-types';
import React from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Button as SharedButton, Context } from 'shared/Button';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { styles as themeStyles } from './theme';

const Button = styled(SharedButton)`
  align-items: center;
  border-bottom: 1px ${CustomProperty.CUSTOM_BORDER_COLOR} solid;
  display: grid;
  font-size: calc(${CustomProperty.BASE_UNIT} * 1.5);
  grid-column-gap: 0.25rem;
  grid-template-columns: auto 1fr;
  height: calc(${CustomProperty.LAYOUT_MAIN_BREADCRUMB_HEIGHT} * 2);
  justify-content: start;
  padding: 0 calc(${CustomProperty.BASE_UNIT} * 1);
  user-select: none;
  width: 100%;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
`;

const AuthButton = ({ onClick }) => {
  const { isAuthenticated, login, logout } = useAuth();

  const t = useTranslate({
    component: 'common',
    namespace: 'common',
  });

  const i18nKey = isAuthenticated ? 'logOut' : 'logIn';

  const onLogIn = () => {
    login();
    onClick();
  };

  const onLogOut = () => {
    logout();
    onClick();
  };

  const onClickProxy = isAuthenticated ? onLogOut : onLogIn;
  const Icon = isAuthenticated ? FaSignOutAlt : FaSignInAlt;

  return (
    <Button
      as="a"
      context={Context.LINK}
      onClick={onClickProxy}
      label={t(i18nKey)}
    >
      <Icon />
      <EllipsiedText>{t(i18nKey)}</EllipsiedText>
    </Button>
  );
};

AuthButton.propTypes = {
  onClick: func.isRequired,
};

export { AuthButton };
