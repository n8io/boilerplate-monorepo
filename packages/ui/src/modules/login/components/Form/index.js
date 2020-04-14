import { UserLoginInput } from '@boilerplate-monorepo/common';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorNotification } from 'shared/ErrorNotification';
import { Form as SharedForm } from 'shared/forms/Form';
import { PasswordInput } from 'shared/forms/PasswordInput';
import { TextInput } from 'shared/forms/TextInput';
import { useForm } from 'shared/forms/useForm';
import { QUERY_USER_SELF, useUserLogin } from 'shared/graphql';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';
import { Actions } from './Actions';

const Form = () => {
  const t = useTranslate({
    component: 'login',
    namespace: 'login',
  });

  const history = useHistory();
  const { isAuthenticated, logout, updateAccessToken } = useAuth();

  const [mutate, { error }] = useUserLogin({
    refetchQueries: [{ query: QUERY_USER_SELF }],
  });

  const formProps = useForm({
    defaultValues: UserLoginInput.initial,
    validationSchema: UserLoginInput.validationSchema,
  });

  const onLogin = values =>
    mutate({
      update: (_cache, { data }) => {
        const { userLogin: accessToken } = data;

        if (!accessToken) {
          logout();

          return;
        }

        updateAccessToken(accessToken);
        history.push(Route.DASHBOARD.path);
      },
      variables: { input: values },
    });

  return (
    <>
      <ErrorNotification error={error} messageKey="loginFailed" t={t} />
      <SharedForm {...formProps} onSubmit={onLogin}>
        <TextInput
          {...UserLoginInput.Limits.username}
          label={t('username')}
          name="username"
        />
        <PasswordInput
          {...UserLoginInput.Limits.password}
          formatError={t}
          label={t('password')}
          name="password"
        />
        <Actions isAuthenticated={isAuthenticated} />
      </SharedForm>
    </>
  );
};

export { Form };
