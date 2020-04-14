import {
  UserRecovery,
  UserRecoveryNotifyInput,
  UserRecoveryNotifyMethod,
} from '@boilerplate-monorepo/common';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorNotification } from 'shared/ErrorNotification';
import { SuccessNotification } from 'shared/SuccessNotification';
import { Form as SharedForm } from 'shared/forms/Form';
import { RadioInput } from 'shared/forms/RadioInput';
import { SubmitButton } from 'shared/forms/SubmitButton';
import { useForm } from 'shared/forms/useForm';
import { useUserPasswordResetRequest } from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components';
import { CustomProperty } from 'types/customProperties';
import { Route } from 'types/route';

const StyledRadioInput = styled(RadioInput)`
  font-family: ${CustomProperty.FONT_MONO};
`;

const Form = ({ user }) => {
  const t = useTranslate({
    component: 'user',
    namespace: 'user',
  });

  const history = useHistory();
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [mutate, { error }] = useUserPasswordResetRequest();

  const formProps = useForm({
    defaultValues: {},
    validationSchema: UserRecoveryNotifyInput.validationSchema,
  });

  useEffect(() => {
    !user && history.push(Route.USER_ACCOUNT_RECOVERY.path);
  }, [user]);

  useEffect(() => {
    isSuccessful && history.push(Route.LOGIN.path);
  }, [isSuccessful]);

  const options = [
    {
      label: user.email,
      value: UserRecoveryNotifyMethod.EMAIL,
    },
  ];

  const onSubmit = async input => {
    setIsSuccessful(false);
    await mutate({ variables: { input } });
    setIsSuccessful(true);
  };

  return (
    <SharedForm {...formProps} onSubmit={onSubmit}>
      <ErrorNotification error={error} messageKey="accountNotifyError" t={t} />
      {isSuccessful && (
        <SuccessNotification message={t('accountNotifySuccess')} />
      )}
      <p>{t('whereToNotifyDetails')}</p>
      <input type="hidden" ref={formProps.register} name="id" value={user.id} />
      <StyledRadioInput
        label={t('chooseARecoveryMethod')}
        name="notificationMethod"
        options={options}
      />
      <SubmitButton isAutoWidth text={t('sendNotificationInformation')} />
    </SharedForm>
  );
};

Form.propTypes = {
  user: UserRecovery.propTypes.isRequired,
};

export { Form };
