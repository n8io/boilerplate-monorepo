import React from 'react';
import { GreaterThanMobile, Mobile } from 'shared/Breakpoints';
import { useAuth } from 'shared/useAuth';
import styled from 'styled-components/macro';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Avatar } from './Avatar';
import { Navigation } from './Navigation';

const Container = styled.div`
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-area: ${GridTemplateArea.USER_MENU};
  grid-auto-flow: column;
  position: relative;
`;

const UserMenu = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container>
      <Mobile>
        <Navigation />
      </Mobile>
      {isAuthenticated && (
        <GreaterThanMobile>
          <Avatar />
        </GreaterThanMobile>
      )}
    </Container>
  );
};

export { UserMenu };
