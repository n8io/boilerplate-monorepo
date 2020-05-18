import { pathOr, pipe, pluck, propOr } from 'ramda';
import React from 'react';
import { Body, Breadcrumb, Breadcrumbs, Header } from 'shared/Content';
import { ErrorNotification } from 'shared/ErrorNotification';
import { Loader } from 'shared/Loader';
import { UserList } from 'shared/UserList';
import { useUsers } from 'shared/graphql';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

// eslint-disable-next-line complexity
const List = () => {
  const t = useTranslate({
    component: 'list',
    namespace: 'users',
  });

  const input = { after: null, first: null };
  const variables = { input };
  const { loading, data, error } = useUsers({ variables });
  const users = pipe(propOr([], 'edges'), pluck('node'))(data);
  const total = pathOr('', ['pageInfo', 'total'], data);
  const isRefreshing = Boolean(loading && data);
  const isInitialLoad = Boolean(loading && !data && !error);
  const totalText = total ? `(${total})` : '';

  return (
    <>
      <Breadcrumbs>
        <Breadcrumb isEnd text={t('users')} to={Route.USER_MANAGEMENT.path} />
      </Breadcrumbs>
      <Header isLoading={isRefreshing} title={t('users')}>
        {t('usersWithTotal', { total: totalText })}
      </Header>
      <Body>
        <ErrorNotification error={error} messageKey="usersFetchFailed" t={t} />
        {isInitialLoad && <Loader />}
        {data && <UserList users={users} />}
      </Body>
    </>
  );
};

export { List };
