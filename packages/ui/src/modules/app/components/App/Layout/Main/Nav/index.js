import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { GridTemplateArea } from '../gridTemplateArea';

const { border } = Color;

const { NAVIGATION } = GridTemplateArea;

const Styled = styled.div`
  border-right: 1px solid ${border};
  display: grid;
  grid-area: ${NAVIGATION};
  overflow-y: auto;
`;

const Nav = () => <Styled>[nav]</Styled>;

export { Nav };
