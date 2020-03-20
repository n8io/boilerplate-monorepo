import { UserRegisterInput } from '@boilerplate-monorepo/common';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Context } from 'shared/Button';
import { EmailInput } from 'shared/forms/EmailInput';
import { PasswordInput } from 'shared/forms/PasswordInput';
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
    defaultValues: UserRegisterInput.initial,
    mode: 'onBlur',
    validationSchema: UserRegisterInput.validationSchema,
  });

  const { handleSubmit, formState } = formProps;
  const { isSubmitting, isValid, touched: isTouched } = formState;

  return (
    <FormContext {...formProps}>
      <form onSubmit={handleSubmit(onRegister)}>
        <TextInput
          {...UserRegisterInput.Limits.username}
          label={t('username')}
          name="username"
          patternDescription={t('DOES_NOT_MEET_USERNAME_REQUIREMENTS')}
        />
        <EmailInput
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
        <PasswordInput
          {...UserRegisterInput.Limits.password}
          formatError={t}
          label={t('password')}
          name="password"
          patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
        />
        <PasswordInput
          {...UserRegisterInput.Limits.confirmPassword}
          formatError={t}
          label={t('confirmPassword')}
          name="confirmPassword"
          patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
        />
        <Button
          context={PRIMARY}
          disabled={(isSubmitting || !isValid) && !isTouched}
          isAutoWidth
          text={t('title')}
          type="submit"
        />
      </form>
    </FormContext>
  );
};

export { Form };
