import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Context } from 'shared/Button';
import { Body, Content, Header, Breadcrumbs, Breadcrumb } from 'shared/Content';
import { Loader } from 'shared/Loader';
import { Page } from 'shared/Page';
import { Mutation } from 'shared/graphql/mutation';
import { Query } from 'shared/graphql/query';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const { PRIMARY } = Context;

// eslint-disable-next-line max-statements
const Profile = () => {
  const t = useTranslate({
    component: 'profile',
    namespace: 'profile',
  });
  const history = useHistory();
  const { data, error, loading } = useQuery(Query.ME);
  const [mutate, { loading: isSubmitting }] = useMutation(
    Mutation.USER_SELF_UPDATE,
    {
      refetchQueries: [{ query: Query.ME }],
    }
  );
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async input => {
    await mutate({ variables: { input } });

    history.push(Route.DASHBOARD.path);
  };

  if (loading || error) {
    return <Loader />;
  }

  const hasErrors = Object.keys(errors).length > 0;
  const { me } = data;
  const { email, username } = me;

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Route.USER_PROFILE.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username">
                <div>Username</div>
                <input
                  defaultValue={username}
                  id="username"
                  placeholder="Username"
                  name="username"
                  readOnly
                  type="text"
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                <div>Email</div>
                <input
                  defaultValue={email}
                  id="email"
                  placeholder="Email"
                  name="email"
                  ref={register({ pattern: /^\S+@\S+$/iu, required: true })}
                  type="email"
                />
              </label>
            </div>
            <div>
              <Button
                context={PRIMARY}
                disabled={isSubmitting || hasErrors}
                isAutoWidth
                onClick={handleSubmit(onSubmit)}
                text={t('updateProfile')}
                type="submit"
              />
            </div>
          </form>
        </Body>
      </Content>
    </Page>
  );
};

export { Profile };
