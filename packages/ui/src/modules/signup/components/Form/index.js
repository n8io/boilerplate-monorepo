import { UserRegisterInput } from '@boilerplate-monorepo/common';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorNotification } from 'shared/ErrorNotification';
import { Captcha } from 'shared/forms/Captcha';
import { EmailInput } from 'shared/forms/EmailInput';
import { Form as SharedForm } from 'shared/forms/Form';
import { PasswordInput } from 'shared/forms/PasswordInput';
import { TextInput } from 'shared/forms/TextInput';
import { useForm } from 'shared/forms/useForm';
import { useUserRegister } from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';
import { Actions } from './Actions';

const Form = () => {
  const t = useTranslate({
    component: 'signup',
    namespace: 'signup',
  });

  const history = useHistory();
  const [mutate, { error }] = useUserRegister();

  const onRegister = async input => {
    await mutate({
      variables: { input: UserRegisterInput.formToInput(input) },
    });

    history.push(Route.LOGIN.path);
  };

  const formProps = useForm({
    defaultValues: UserRegisterInput.initial,
    validationSchema: UserRegisterInput.validationSchema,
  });

  return (
    <>
      <SharedForm {...formProps} onSubmit={onRegister}>
        <ErrorNotification error={error} messageKey="signupFailed" t={t} />
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
          {...UserRegisterInput.Limits.passwordNew}
          formatError={t}
          label={t('password')}
          name="passwordNew"
          patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
        />
        <PasswordInput
          {...UserRegisterInput.Limits.passwordConfirm}
          formatError={t}
          label={t('confirmPassword')}
          name="passwordConfirm"
          patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
        />
        <Captcha />
        <Actions />
      </SharedForm>
    </>
  );
};

export { Form };
