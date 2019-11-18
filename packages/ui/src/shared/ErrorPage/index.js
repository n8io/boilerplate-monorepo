import officePanda from 'assets/images/officePanda.gif';
import { config } from 'config';
import { func, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Button as SharedButton, Context } from '../Button';
import { Body as ContentBody, Content, Header } from '../Content';
import { useTranslate } from '../useTranslate';

const { isDebug } = config;

const domTestId = 'ErrorPage';

const Body = styled(ContentBody)`
  justify-items: center;
  text-align: center;

  img {
    border-radius: calc(var(--layout-base-unit) * 0.25);
    margin-bottom: var(--layout-base-unit);
  }
`;

const Code = styled.pre`
  white-space: normal;
  width: auto;
`;

const Button = styled(SharedButton)`
  margin: 0 auto;
  width: auto;
`;

const ErrorPage = ({ message, onFeedbackClick }) => {
  const t = useTranslate({
    component: 'error',
    namespace: 'error',
  });

  return (
    <Content data-testid={domTestId}>
      <Header title={t('title')} />
      <Body hasBreadcrumbs={false}>
        {isDebug && <Code>{message}</Code>}
        <img src={officePanda} alt={t('officePanda')} />
        <p>{t('statement')}</p>
        <p>
          <Button
            context={Context.PRIMARY}
            onClick={onFeedbackClick}
            text={t('tellUsMore')}
          />
        </p>
      </Body>
    </Content>
  );
};

ErrorPage.propTypes = {
  message: string.isRequired,
  onFeedbackClick: func.isRequired,
};

export { ErrorPage, domTestId };
