import { UserRegisterInput } from '@boilerplate-monorepo/common';
import { Input as InputType } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Context } from 'shared/Button';
import { TextInput } from 'shared/forms/TextInput';
import { useUserRegister } from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const { PRIMARY } = Context;

const Form = () => {
  const t = useTranslate({
    component: 'signup',
    namespace: 'signup',
  });

  const history = useHistory();
  const [mutate] = useUserRegister();

  const onRegister = async input => {
    await mutate({
      variables: { input: UserRegisterInput.formToInput(input) },
    });

    history.push(Route.LOGIN.path);
  };

  const formProps = useForm({
    defaultValues: {
      email: '',
      familyName: '',
      givenName: '',
      password: '',
      username: '',
    },
    mode: 'onChange',
    validationSchema: UserRegisterInput.validationSchema,
  });

  const { handleSubmit, formState } = formProps;
  const { isSubmitting, isValid } = formState;

  return (
    <FormContext {...formProps}>
      <form onSubmit={handleSubmit(onRegister)}>
        <TextInput
          {...UserRegisterInput.Limits.username}
          label={t('username')}
          name="username"
        />
        <TextInput
          {...UserRegisterInput.Limits.email}
          label={t('emailAddress')}
          name="email"
        />
        <TextInput
          {...UserRegisterInput.Limits.givenName}
          label={t('givenName')}
          name="givenName"
        />
        <TextInput
          {...UserRegisterInput.Limits.familyName}
          label={t('familyName')}
          name="familyName"
        />
        <TextInput
          {...UserRegisterInput.Limits.password}
          formatError={t}
          label={t('password')}
          name="password"
          type={InputType.PASSWORD}
        />
        <TextInput
          {...UserRegisterInput.Limits.confirmPassword}
          formatError={t}
          label={t('confirmPassword')}
          name="confirmPassword"
          type={InputType.PASSWORD}
        />
        <Button
          context={PRIMARY}
          disabled={isSubmitting || !isValid}
          isAutoWidth
          text={t('title')}
          type="submit"
        />
      </form>
    </FormContext>
  );
};

export { Form };
