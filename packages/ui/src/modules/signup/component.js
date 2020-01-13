import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Context } from 'shared/Button';
import { Body, Content, Header, Breadcrumbs, Breadcrumb } from 'shared/Content';
import { Link } from 'shared/Link';
import { Page } from 'shared/Page';
import { Mutation } from 'shared/graphql/mutation';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const { PRIMARY } = Context;

const Signup = () => {
  const t = useTranslate({
    component: 'signup',
    namespace: 'signup',
  });

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { isAuthenticated } = useAuth();
  const [mutate, { loading: isDisabled }] = useMutation(Mutation.USER_REGISTER);

  const onRegister = async () => {
    const input = {
      email,
      password,
      username,
    };

    await mutate({ variables: { input } });

    history.push(Route.LOGIN.path);
  };

  const onChange = setFn => e => {
    const { target } = e;
    const { value } = target;

    setFn(value);
  };

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Route.SIGNUP.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <>
            {!isAuthenticated && (
              <form onSubmit={e => e.preventDefault()}>
                <div>
                  <input
                    name="username"
                    onChange={onChange(setUsername)}
                    placeholder="username"
                    type="text"
                    value={username}
                  />
                </div>
                <div>
                  <input
                    name="email"
                    onChange={onChange(setEmail)}
                    placeholder="email"
                    type="text"
                    value={email}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    onChange={onChange(setPassword)}
                    placeholder="password"
                    type="password"
                    value={password}
                  />
                </div>
                <Button
                  context={PRIMARY}
                  disabled={isDisabled}
                  isAutoWidth
                  onClick={onRegister}
                  text={t('title')}
                  type="submit"
                />
              </form>
            )}
            <br />
            or <Link to={Route.LOGIN.path}>{t('login')}</Link>
          </>
        </Body>
      </Content>
    </Page>
  );
};

export { Signup };
