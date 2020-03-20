import { FetchPolicy, UserSelfUpdateInput } from '@boilerplate-monorepo/common';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Context } from 'shared/Button';
import { EmailInput } from 'shared/forms/EmailInput';
import { Form as SharedForm } from 'shared/forms/Form';
import { TextInput } from 'shared/forms/TextInput';
import { useForm } from 'shared/forms/useForm';
import {
  QUERY_USER_SELF,
  useUserSelf,
  useUserSelfUpdate,
} from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const { PRIMARY } = Context;

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
    mode: 'onBlur',
    validationSchema: UserSelfUpdateInput.validationSchema,
  });

  if (loading || !self) return null;

  const { isSaveable } = formProps;

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
      <Button
        context={PRIMARY}
        disabled={!isSaveable}
        isAutoWidth
        text={t('updateProfile')}
        type="submit"
      />
    </SharedForm>
  );
};

export { Form };
