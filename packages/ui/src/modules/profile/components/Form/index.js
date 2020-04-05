import { FetchPolicy, UserSelfUpdateInput } from '@boilerplate-monorepo/common';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmailInput } from 'shared/forms/EmailInput';
import { Form as SharedForm, Mode } from 'shared/forms/Form';
import { SubmitButton } from 'shared/forms/SubmitButton';
import { TextInput } from 'shared/forms/TextInput';
import { useForm } from 'shared/forms/useForm';
import {
  QUERY_USER_SELF,
  useUserSelf,
  useUserSelfUpdate,
} from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const Form = () => {
  const t = useTranslate({
    component: 'profile',
    namespace: 'profile',
  });

  const history = useHistory();
  const [mutate] = useUserSelfUpdate();

  const { data: self, loading } = useUserSelf({
    fetchPolicy: FetchPolicy.CACHE_AND_NETWORK,
  });

  const onSelfUpdate = async input => {
    await mutate({
      refetchQueries: [{ query: QUERY_USER_SELF }],
      variables: { input: UserSelfUpdateInput.formToInput(input) },
    });

    history.push(Route.DASHBOARD.path);
  };

  const formProps = useForm({
    defaultValues: UserSelfUpdateInput.makeInitial(self),
    mode: Mode.ON_BLUR,
    validationSchema: UserSelfUpdateInput.validationSchema,
  });

  if (loading || !self) return null;

  return (
    <SharedForm {...formProps} onSubmit={onSelfUpdate}>
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
