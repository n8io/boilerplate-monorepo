import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Context } from 'shared/Button';
import { Body, Breadcrumb, Breadcrumbs, Content, Header } from 'shared/Content';
import { Link } from 'shared/Link';
import { Page } from 'shared/Page';
import { Mutation } from 'shared/graphql/mutation';
import { Query } from 'shared/graphql/query';
import { useMutation } from 'shared/graphql/useMutation';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const { PRIMARY } = Context;
// eslint-disable-next-line max-statements
const Login = () => {
  const t = useTranslate({
    component: 'login',
    namespace: 'login',
  });
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, logout, updateAccessToken } = useAuth();

  const [mutate, { loading: isDisabled }] = useMutation(Mutation.USER_LOGIN, {
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
        history.push(Route.DASHBOARD.path);
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
                  <label htmlFor="username">
                    <div>Username</div>
                    <input
                      id="username"
                      name="username"
                      onChange={onUsernameChange}
                      placeholder="username"
                      type="text"
                      value={username}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="password">
                    <div>Password</div>
                    <input
                      id="password"
                      name="password"
                      onChange={onPasswordChange}
                      placeholder="password"
                      type="password"
                      value={password}
                    />
                  </label>
                </div>
                <Button
                  context={PRIMARY}
                  disabled={isDisabled}
                  isAutoWidth
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
