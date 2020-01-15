import { useQuery } from '@apollo/client';
import { url } from 'gravatar';
import React from 'react';
import { Loader } from 'shared/Loader';
import { Muted } from 'shared/Muted';
import { Query } from 'shared/graphql/query';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';

const Container = styled.div`
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-area: ${GridTemplateArea.AVATAR};
  grid-auto-flow: column;
  position: relative;
`;

const Image = styled.img`
  border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  border-radius: 100%;
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
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  const { me } = data;
  const { email, username } = me;
  const hash = url(email, { r: 'G', s: 30 });

  return (
    <Container>
      <Muted>{username}</Muted>
      <Image alt={t('avatarForEmail', { email })} src={hash} />
    </Container>
  );
};

export { Avatar };
