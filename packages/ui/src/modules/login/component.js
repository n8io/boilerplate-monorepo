import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button as SharedButton, Context } from 'shared/Button';
import { Body, Breadcrumb, Breadcrumbs, Content, Header } from 'shared/Content';
import { Link } from 'shared/Link';
import { Page } from 'shared/Page';
import { Mutation } from 'shared/graphql/mutation';
import { Query } from 'shared/graphql/query';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Route } from 'types/route';

const { PRIMARY } = Context;

const Button = styled(SharedButton)`
  width: fit-content;
`;

// eslint-disable-next-line max-statements
const Login = () => {
  const t = useTranslate({
    component: 'login',
    namespace: 'login',
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, logout, updateAccessToken } = useAuth();

  const [mutate, { loading: isDisabled }] = useMutation(Mutation.LOGIN, {
    refetchQueries: [{ query: Query.ME }],
  });

  const onLogin = async () => {
    const input = {
      password,
      username,
    };

    await mutate({
      update: (_cache, { data }) => {
        const { userLogin: accessToken } = data;

        if (!accessToken) {
          logout();

          return;
        }

        updateAccessToken(accessToken);
      },
      variables: { input },
    });
  };

  const onUsernameChange = e => {
    setUsername(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onLogout = logout;
  const logInOutKey = isAuthenticated ? t('logout') : t('title');
  const authFn = isAuthenticated ? onLogout : onLogin;

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Route.SIGNUP.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          {isAuthenticated ? (
            <Link to={Route.LOGOUT.path}>{t('logout')}</Link>
          ) : (
            <>
              <form onSubmit={e => e.preventDefault()}>
                <div>
                  <input
                    name="username"
                    onChange={onUsernameChange}
                    placeholder="username"
                    type="text"
                    value={username}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    onChange={onPasswordChange}
                    placeholder="password"
                    type="password"
                    value={password}
                  />
                </div>
                <Button
                  context={PRIMARY}
                  disabled={isDisabled}
                  onClick={authFn}
                  text={logInOutKey}
                  type="submit"
                />
              </form>
              <br />
              or <Link to={Route.SIGNUP.path}>{t('signup')}</Link>
            </>
          )}
        </Body>
      </Content>
    </Page>
  );
};

export { Login };
