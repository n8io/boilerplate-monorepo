import { useQuery } from '@apollo/client';
import { url } from 'gravatar';
import React from 'react';
import { Loader } from 'shared/Loader';
import { Muted } from 'shared/Muted';
import { Query } from 'shared/graphql/query';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';

const Image = styled.img`
  border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  border-radius: 100%;
`;

const StyledMuted = styled(Muted)`
  font-size: ${CustomProperty.BASE_UNIT};
`;

const Avatar = () => {
  const t = useTranslate({
    component: 'avatar',
    namespace: 'app',
  });
  const { data, error, loading } = useQuery(Query.ME);

  if (error) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  const { me } = data;
  const { email, username } = me;
  const hash = url(email, { r: 'G', s: 30 });

  return (
    <>
      <StyledMuted>{username}</StyledMuted>
      <Image alt={t('avatarForEmail', { email })} src={hash} />
    </>
  );
};

export { Avatar };
