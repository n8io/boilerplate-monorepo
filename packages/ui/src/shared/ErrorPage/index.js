import officePanda from 'assets/images/officePanda.gif';
import { config } from 'config';
import { string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Body, Content, Footer, Header } from '../Content';
import { useTranslate } from '../useTranslate';

const domTestId = 'ErrorPage';

const Styled = styled(Body)`
  align-items: center;
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: center;

  img {
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
`;

const Center = styled.div`
  display: grid;
  justify-items: center;
`;

const ErrorPage = ({ message }) => {
  const t = useTranslate({
    component: 'error',
    namespace: 'error',
  });

  return (
    <Content data-testid={domTestId}>
      <Header title={t('title')} />
      <Styled hasBreadcrumbs={false}>
        <div />
        <Center>
          {config.isDevelopment ? (
            <pre data-testid="errorDetails">{message}</pre>
          ) : (
            <>
              <img src={officePanda} alt={t('officePanda')} />
              <p>{t('body')}</p>
              {config.isDebug && <pre>{message}</pre>}
            </>
          )}
        </Center>
      </Styled>
      <Footer />
    </Content>
  );
};

ErrorPage.propTypes = {
  message: string.isRequired,
};

export { ErrorPage, domTestId };
