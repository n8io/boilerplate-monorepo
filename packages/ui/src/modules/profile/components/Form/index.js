import { FetchPolicy, UserSelfUpdateInput } from '@boilerplate-monorepo/common';
import { pick } from 'ramda';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Context } from 'shared/Button';
import { TextInput } from 'shared/forms/TextInput';
import {
  useUserSelfUpdate,
  useUserSelf,
  QUERY_USER_SELF,
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
    defaultValues: pick(['email', 'username'], self),
    mode: 'onChange',
    validationSchema: UserSelfUpdateInput.validationSchema,
  });

  if (loading || !self) return null;

  const { handleSubmit, formState } = formProps;
  const { dirty: isDirty, isSubmitting, isValid } = formState;

  return (
    <FormContext {...formProps}>
      <form onSubmit={handleSubmit(onSelfUpdate)}>
        <TextInput
          {...UserSelfUpdateInput.Limits.username}
          disabled
          label={t('username')}
          name="username"
          patternDescription={t('DOES_NOT_MEET_USERNAME_REQUIREMENTS')}
        />
        <TextInput
          {...UserSelfUpdateInput.Limits.email}
          label={t('emailAddress')}
          name="email"
        />
        <Button
          context={PRIMARY}
          disabled={isSubmitting || !isValid || !isDirty}
          isAutoWidth
          text={t('updateProfile')}
          type="submit"
        />
      </form>
    </FormContext>
  );
};

export { Form };
