import { FetchPolicy, UserSelfUpdateInput } from '@boilerplate-monorepo/common';
import React, { useEffect, useState } from 'react';
import { ErrorNotification } from 'shared/ErrorNotification';
import { Loader } from 'shared/Loader';
import { SuccessNotification } from 'shared/SuccessNotification';
import { EmailInput } from 'shared/forms/EmailInput';
import { Form as SharedForm } from 'shared/forms/Form';
import { SubmitButton } from 'shared/forms/SubmitButton';
import { TextInput } from 'shared/forms/TextInput';
import { useForm } from 'shared/forms/useForm';
import {
  QUERY_USER_SELF,
  useUserSelf,
  useUserSelfUpdate,
} from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';

const Form = () => {
  const t = useTranslate({
    component: 'user',
    namespace: 'user',
  });

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [mutate, { error: userSelfUpdateError }] = useUserSelfUpdate();

  const { data: self, error: userSelfError, loading } = useUserSelf({
    fetchPolicy: FetchPolicy.CACHE_AND_NETWORK,
  });

  const formProps = useForm({
    validationSchema: UserSelfUpdateInput.validationSchema,
  });

  const { reset } = formProps;

  const onSelfUpdate = async input => {
    setIsSuccessful(false);

    await mutate({
      refetchQueries: [{ query: QUERY_USER_SELF }],
      variables: { input: UserSelfUpdateInput.formToInput(input) },
    });

    setIsSuccessful(true);
  };

  useEffect(() => {
    reset(UserSelfUpdateInput.makeInitial(self));
  }, [self, reset]);

  if (loading || !self) return <Loader />;

  return (
    <SharedForm {...formProps} onSubmit={onSelfUpdate}>
      <ErrorNotification
        error={userSelfError || userSelfUpdateError}
        messageKey="securityUpdateError"
        t={t}
      />
      {isSuccessful && (
        <SuccessNotification message={t('profileUpdateSuccess')} />
      )}
      <TextInput
        {...UserSelfUpdateInput.Limits.username}
        disabled
        label={t('username')}
        name="username"
        patternDescription={t('DOES_NOT_MEET_USERNAME_REQUIREMENTS')}
      />
      <EmailInput
        {...UserSelfUpdateInput.Limits.email}
        label={t('emailAddress')}
        name="email"
      />
      <TextInput
        {...UserSelfUpdateInput.Limits.givenName}
        label={t('givenName')}
        name="givenName"
      />
      <TextInput
        {...UserSelfUpdateInput.Limits.familyName}
        label={t('familyName')}
        name="familyName"
      />
      <SubmitButton isAutoWidth text={t('updateProfile')} />
    </SharedForm>
  );
};

export { Form };
