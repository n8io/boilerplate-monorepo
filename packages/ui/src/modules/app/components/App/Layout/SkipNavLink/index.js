import React from 'react';
import styled from 'styled-components/macro';
import { domId } from '../Main';

const Styled = styled.a`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute !important;
  width: 1px;

  &:focus {
    background-color: #f1f1f1;
    border-radius: 3px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.6);
    clip: auto !important;
    color: #21759b;
    display: block;
    font-size: 14px;
    font-size: 0.875rem;
    font-weight: 700;
    height: auto;
    left: 5px;
    line-height: normal;
    padding: 15px 23px 14px;
    position: fixed;
    text-decoration: none;
    top: 5px;
    width: auto;
    z-index: 100000;
  }
`;

const SkipNavLink = () => <Styled href={`#${domId}`}>Skip to content</Styled>;

export { SkipNavLink };
