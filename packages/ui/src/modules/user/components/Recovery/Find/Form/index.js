import { UserRecoveryFindInput } from '@boilerplate-monorepo/common';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorNotification } from 'shared/ErrorNotification';
import { Loader } from 'shared/Loader';
import { Form as SharedForm } from 'shared/forms/Form';
import { SubmitButton } from 'shared/forms/SubmitButton';
import { TextInput } from 'shared/forms/TextInput';
import { useForm } from 'shared/forms/useForm';
import { useUserRecoveryFind } from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

// eslint-disable-next-line max-statements
const Form = () => {
  const t = useTranslate({
    component: 'user',
    namespace: 'user',
  });

  const history = useHistory();
  const [errorNotFound, setErrorNotFound] = useState();

  const [
    userRecoveryFind,
    { called: hasBeenCalled, data: user, error, loading },
  ] = useUserRecoveryFind({
    isLazy: true,
  });

  const formProps = useForm({
    defaultValues: UserRecoveryFindInput.initial,
    validationSchema: UserRecoveryFindInput.validationSchema,
  });

  useEffect(() => {
    user && history.push(Route.USER_ACCOUNT_RECOVERY_NOTIFY.path, { user });
  }, [user]);

  useEffect(() => {
    if (loading) {
      setErrorNotFound(null);

      return;
    }

    if (error) {
      setErrorNotFound(error);
    } else if (user === null) {
      setErrorNotFound(new Error('USER_NOT_FOUND'));
    }
  }, [loading, error, user]);

  if (loading && !hasBeenCalled) {
    return <Loader />;
  }

  const onSubmit = input =>
    userRecoveryFind({
      variables: input,
    });

  return (
    <SharedForm {...formProps} onSubmit={onSubmit}>
      <ErrorNotification
        error={errorNotFound}
        messageKey="accountFindError"
        t={t}
      />
      <p>{t('pleaseProvideAccountDetails')}</p>
      <TextInput
        {...UserRecoveryFindInput.Limits.account}
        label={t('emailOrUsername')}
        name="account"
      />
      <SubmitButton isAutoWidth text={t('findAccount')} />
    </SharedForm>
  );
};

export { Form };
