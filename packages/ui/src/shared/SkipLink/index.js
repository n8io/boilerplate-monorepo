import { SkipToDestination } from '@boilerplate-monorepo/ui-common';
import { string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { styles as themeStyles } from './theme';

const Container = styled.a`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: fixed !important;
  width: 1px;

  &:focus {
    border-radius: 0 0 0.25rem 0.25rem;
    clip: auto !important;
    display: block;
    font-size: 1rem;
    height: auto;
    left: 50%;
    line-height: normal;
    padding: calc(${CustomProperty.BASE_UNIT} * 0.25)
      calc(${CustomProperty.BASE_UNIT} * 0.5);
    position: fixed;
    text-decoration: none;
    top: 0;
    transform: translateX(-50%);
    width: auto;
    z-index: ${CustomProperty.Z_INDEX_SKIP_LINK};
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
`;

const SkipLink = ({ id, text }) => (
  <Container href={`#${id}`}>{text}</Container>
);

SkipLink.propTypes = {
  id: SkipToDestination.propTypes.isRequired,
  text: string.isRequired,
};

export { SkipLink };
