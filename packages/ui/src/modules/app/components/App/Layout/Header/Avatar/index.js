import { url } from 'gravatar';
import { string } from 'prop-types';
import React from 'react';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { GridTemplateArea } from 'types/gridTemplateArea';

const Image = styled.img`
  border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  border-radius: 100%;
  grid-area: ${GridTemplateArea.AVATAR};
`;

const Avatar = ({ email }) => {
  const t = useTranslate({
    component: 'avatar',
    namespace: 'app',
  });
  const hash = url(email, { r: 'G', s: 30 });

  return <Image alt={t('avatarForEmail', { email })} src={hash} />;
};

Avatar.propTypes = {
  email: string.isRequired,
};

export { Avatar };
