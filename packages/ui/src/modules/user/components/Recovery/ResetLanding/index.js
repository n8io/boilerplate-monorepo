import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ErrorNotification } from 'shared/ErrorNotification';
import { Loader } from 'shared/Loader';
import { useUserPasswordResetTokenValidate } from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import { logFactory } from 'types/logFactory';
import { Route } from 'types/route';

const debugLog = logFactory({
  method: 'render',
  module: 'Reset',
});

const TokenInvalidError = new Error('TOKEN_INVALID');

// eslint-disable-next-line max-statements
const ResetLanding = () => {
  const t = useTranslate({
    component: 'user',
    namespace: 'user',
  });

  const { token } = useParams();
  const history = useHistory();
  const [error, setError] = useState();

  const {
    data: id,
    error: errorValidate,
    loading,
  } = useUserPasswordResetTokenValidate({
    variables: {
      input: { token },
    },
  });

  useEffect(() => {
    if (!errorValidate) return;

    debugLog('🛑 Failed to validate token');

    setError(TokenInvalidError);
    setTimeout(() => history.push(Route.USER_ACCOUNT_RECOVERY.path), 1);
  }, [errorValidate]);

  useEffect(() => {
    if (token) return;

    debugLog('🛑 Token not provided');
    setError(TokenInvalidError);

    setTimeout(() => history.push(Route.USER_ACCOUNT_RECOVERY.path), 1);
  }, [token]);

  useEffect(() => {
    if (loading) return;

    if (id) {
      history.push(Route.USER_ACCOUNT_RECOVERY_PASSWORD_RESET.path, {
        id,
        token,
      });

      return;
    }

    debugLog('🛑 Token is not valid');

    setError(TokenInvalidError);

    setTimeout(() => history.push(Route.USER_ACCOUNT_RECOVERY.path), 1);
  }, [id, loading]);

  if (error) {
    return (
      <ErrorNotification error={error} messageKey="passwordTokenError" t={t} />
    );
  }

  return <Loader />;
};

export { ResetLanding };
