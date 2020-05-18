import { Utils } from '@boilerplate-monorepo/common';
import { SkipToDestination } from '@boilerplate-monorepo/ui-common';
import { bool, node, string } from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Loader } from 'shared/Loader';
import styled, { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { document } from 'types/document';
import { Fade } from 'types/fade';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { EllipsiedText } from '../../EllipsiedText';
import { PageTitle } from '../../PageTitle';
import { useModality } from '../../useModality';
import { domId as bodyDomId } from '../Body';
import { SkipToNavLink } from './SkipToNavLink';
import { styles as themeStyles } from './theme';

const DELAY = '0.3s';

const Container = styled.div`
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  display: grid;
  grid-auto-flow: column;
  grid-template-areas: '. . ${GridTemplateArea.NAV_MOBILE}';
  grid-template-columns: auto 1fr auto;
  height: ${CustomProperty.LAYOUT_MAIN_HEADER_HEIGHT};
  margin: calc(${CustomProperty.BASE_UNIT} * 0.5) ${CustomProperty.BASE_UNIT} 0;
  padding: 0;
  transition:
    border ${DELAY} ${CustomProperty.TRANSITION_TIMING_FUNCTION},
    height ${DELAY} ${CustomProperty.TRANSITION_TIMING_FUNCTION},
    margin ${DELAY} ${CustomProperty.TRANSITION_TIMING_FUNCTION},
    padding ${DELAY} ${CustomProperty.TRANSITION_TIMING_FUNCTION}
    ;

  &::before {
    opacity: 0;
    transition: opacity ${DELAY} ${CustomProperty.TRANSITION_TIMING_FUNCTION};
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
  ${Fade.top}
  ${({ isScrolled }) =>
    isScrolled &&
    css`
      border-bottom: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
      height: calc(${CustomProperty.BASE_UNIT} * 2);
      margin: 0;
      padding: 0 ${CustomProperty.BASE_UNIT};

      &::before {
        opacity: 1;
      }
    `}
`;

const H1 = styled(EllipsiedText)`
  margin-bottom: 0;
  transition: font-size 0.5s ${CustomProperty.TRANSITION_TIMING_FUNCTION};

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${({ isScrolled }) =>
    isScrolled &&
    css`
      font-size: calc(${CustomProperty.BASE_UNIT} * 1.25);
    `}
`;

const LoaderContainer = styled.div`
  position: absolute;
  right: ${({ isScrolled }) => (isScrolled ? '2rem' : '1rem')};
  top: 50%;
  transition: right 0.5s ${CustomProperty.TRANSITION_TIMING_FUNCTION};
`;

const Header = ({ children, isLoading, title }) => {
  const { isEnabled: isModalityEnabled } = useModality();
  const [isScrolled, beScrolled] = useState(false);

  const onScroll = useCallback(
    Utils.debounce(() => {
      const isTop = !document.getElementById(bodyDomId).scrollTop;

      if (isTop === isScrolled) {
        beScrolled(!isScrolled);
      }
    })
  );

  useLayoutEffect(() => {
    document.getElementById(bodyDomId).addEventListener('scroll', onScroll);

    return () =>
      document
        .getElementById(bodyDomId)
        .removeEventListener('scroll', onScroll);
  });

  const autoFocus = isModalityEnabled && { 'data-autofocus': true };

  return (
    <Container isScrolled={isScrolled}>
      <PageTitle title={title} />
      {isModalityEnabled && <SkipToNavLink />}
      <H1
        as="h1"
        id={SkipToDestination.MAIN}
        isScrolled={isScrolled}
        tabIndex={0}
        {...autoFocus}
      >
        {children || title}
        {isLoading && (
          <LoaderContainer isScrolled={isScrolled}>
            <Loader />
          </LoaderContainer>
        )}
      </H1>
      <div />
    </Container>
  );
};

Header.defaultProps = {
  children: undefined,
  isLoading: false,
};

Header.propTypes = {
  children: node,
  isLoading: bool,
  title: string.isRequired,
};

export { Header };
