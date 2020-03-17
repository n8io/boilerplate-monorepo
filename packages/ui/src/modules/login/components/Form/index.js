import { UserLoginInput } from '@boilerplate-monorepo/common';
import { Input as InputType } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Context } from 'shared/Button';
import { TextInput } from 'shared/forms/TextInput';
import { QUERY_USER_SELF, useUserLogin } from 'shared/graphql';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const { PRIMARY } = Context;

const Form = () => {
  const t = useTranslate({
    component: 'login',
    namespace: 'login',
  });

  const history = useHistory();
  const { isAuthenticated, logout, updateAccessToken } = useAuth();

  const [mutate] = useUserLogin({
    refetchQueries: [{ query: QUERY_USER_SELF }],
  });

  const onLogin = async values => {
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
      variables: { input: values },
    });
  };

  const logInOutKey = isAuthenticated ? t('logout') : t('title');

  const formProps = useForm({
    defaultValues: { password: '', username: '' },
    mode: 'onChange',
    validationSchema: UserLoginInput.validationSchema,
  });

  const { handleSubmit, formState } = formProps;
  const { isSubmitting, isValid } = formState;

  return (
    <FormContext {...formProps}>
      <form onSubmit={handleSubmit(onLogin)}>
        <TextInput
          {...UserLoginInput.Limits.username}
          label={t('username')}
          name="username"
        />
        <TextInput
          {...UserLoginInput.Limits.password}
          formatError={t}
          label={t('password')}
          name="password"
          type={InputType.PASSWORD}
        />
        <Button
          context={PRIMARY}
          disabled={isSubmitting || !isValid}
          isAutoWidth
          text={logInOutKey}
          type="submit"
        />
      </form>
    </FormContext>
  );
};

export { Form };
