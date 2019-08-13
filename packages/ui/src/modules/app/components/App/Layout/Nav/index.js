import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { GridTemplateArea } from '../gridTemplateArea';

const { border } = Color;

const { NAV } = GridTemplateArea;

const Styled = styled.nav`
  border-right: 1px solid ${border};
  display: grid;
  grid-area: ${NAV};
  overflow-y: auto;
`;

const Nav = () => <Styled role="navigation">[nav]</Styled>;

export { Nav };
