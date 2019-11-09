import officePanda from 'assets/images/officePanda.gif';
import { config } from 'config';
import { string, func } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Button, Context } from '../Button';
import { Body, Content, Footer, Header } from '../Content';
import { useTranslate } from '../useTranslate';

const domTestId = 'ErrorPage';

const Styled = styled(Body)`
  align-items: center;
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: center;

  img {
    border-radius: var(--layout-base-unit);
    margin-bottom: var(--layout-base-unit);
  }
`;

const Center = styled.div`
  display: grid;
  justify-items: center;
`;

const ErrorPage = ({ message, onFeedbackClick }) => {
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
          <p>
            <Button
              context={Context.PRIMARY}
              onClick={onFeedbackClick}
              text={t('submitFeedback')}
            />
          </p>
        </Center>
      </Styled>
      <Footer />
    </Content>
  );
};

ErrorPage.propTypes = {
  message: string.isRequired,
  onFeedbackClick: func.isRequired,
};

export { ErrorPage, domTestId };
