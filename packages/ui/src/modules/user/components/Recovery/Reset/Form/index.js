import {
  UserPasswordResetInput,
  UserRegisterInput,
} from '@boilerplate-monorepo/common';
import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorNotification } from 'shared/ErrorNotification';
import { SuccessNotification } from 'shared/SuccessNotification';
import { Form as SharedForm, Mode } from 'shared/forms/Form';
import { HiddenInput } from 'shared/forms/HiddenInput';
import { PasswordInput } from 'shared/forms/PasswordInput';
import { SubmitButton } from 'shared/forms/SubmitButton';
import { useForm } from 'shared/forms/useForm';
import { useUserPasswordReset } from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const Form = ({ id, token }) => {
  const t = useTranslate({
    component: 'reset',
    namespace: 'user',
  });

  const history = useHistory();
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [mutate, { error, loading }] = useUserPasswordReset();

  const formProps = useForm({
    defaultValues: {
      ...UserPasswordResetInput.makeInitial({ id, token }),
    },
    mode: Mode.ON_BLUR,
    validationSchema: UserPasswordResetInput.validationSchema,
  });

  useEffect(() => {
    error && history.push(Route.USER_ACCOUNT_RECOVERY.path);
  }, [error]);

  useEffect(() => {
    isSuccessful && history.push(Route.LOGIN.path);
  }, [isSuccessful]);

  const onSubmit = async (input) => {
    setIsSuccessful(false);

    await mutate({
      variables: { input: UserPasswordResetInput.formToInput(input) },
    });

    setIsSuccessful(true);
  };

  if (loading) return null;

  return (
    <SharedForm {...formProps} onSubmit={onSubmit}>
      <ErrorNotification error={error} messageKey="passwordResetError" t={t} />
      {isSuccessful && (
        <SuccessNotification message={t('passwordResetSuccess')} />
      )}
      <p>{t('passwordResetDetails')}</p>
      <HiddenInput name="id" value={id} />
      <input
        type="hidden"
        ref={formProps.register}
        name="token"
        value={token}
      />
      <PasswordInput
        {...UserRegisterInput.Limits.passwordNew}
        formatError={t}
        label={t('newPassword')}
        name="passwordNew"
        patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
      />
      <PasswordInput
        {...UserRegisterInput.Limits.passwordConfirm}
        formatError={t}
        label={t('confirmNewPassword')}
        name="passwordConfirm"
        patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
      />
      <SubmitButton isAutoWidth text={t('saveNewPassword')} />
    </SharedForm>
  );
};

Form.propTypes = {
  id: string.isRequired,
  token: string.isRequired,
};

export { Form };
