import { useQuery } from '@apollo/client';
import { url } from 'gravatar';
import React from 'react';
import { Loader } from 'shared/Loader';
import { Query } from 'shared/graphql/query';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';

const Container = styled.div`
  grid-area: ${GridTemplateArea.AVATAR};
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
  const { email } = me;
  const hash = url(email, { r: 'G', s: 30 });

  return (
    <Container>
      <Image alt={t('avatarForEmail', { email })} src={hash} />
    </Container>
  );
};

export { Avatar };
