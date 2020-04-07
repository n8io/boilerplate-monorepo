import { UserSelfSecurityUpdateInput } from '@boilerplate-monorepo/common';
import React, { useState } from 'react';
import { ErrorNotification } from 'shared/ErrorNotification';
import { SuccessNotification } from 'shared/SuccessNotification';
import { Form as SharedForm } from 'shared/forms/Form';
import { PasswordInput } from 'shared/forms/PasswordInput';
import { SubmitButton } from 'shared/forms/SubmitButton';
import { useForm } from 'shared/forms/useForm';
import { useUserSelfSecurityUpdate } from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';

const Form = () => {
  const t = useTranslate({
    component: 'user',
    namespace: 'user',
  });

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [mutate, { error }] = useUserSelfSecurityUpdate();

  const formProps = useForm({
    defaultValues: UserSelfSecurityUpdateInput.initial,
    validationSchema: UserSelfSecurityUpdateInput.validationSchema,
  });

  const { reset } = formProps;

  const onSubmit = async input => {
    setIsSuccessful(false);

    await mutate({
      variables: { input: UserSelfSecurityUpdateInput.formToInput(input) },
    });

    setIsSuccessful(true);
    reset(UserSelfSecurityUpdateInput.initial);
  };

  return (
    <SharedForm {...formProps} onSubmit={onSubmit}>
      <ErrorNotification error={error} messageKey="securityUpdateError" t={t} />
      {isSuccessful && (
        <SuccessNotification message={t('securityUpdateSuccess')} />
      )}
      <PasswordInput
        {...UserSelfSecurityUpdateInput.Limits.passwordCurrent}
        formatError={t}
        label={t('currentPassword')}
        name="passwordCurrent"
        patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
      />
      <PasswordInput
        {...UserSelfSecurityUpdateInput.Limits.passwordNew}
        formatError={t}
        label={t('newPassword')}
        name="passwordNew"
        patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
      />
      <PasswordInput
        {...UserSelfSecurityUpdateInput.Limits.passwordConfirm}
        formatError={t}
        label={t('confirmPassword')}
        name="passwordConfirm"
        patternDescription={t('DOES_NOT_MEET_PASSWORD_REQUIREMENTS')}
      />
      <SubmitButton isAutoWidth text={t('updatePassword')} />
    </SharedForm>
  );
};

export { Form };
