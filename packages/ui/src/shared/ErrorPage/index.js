import officePanda from 'assets/images/officePanda.gif';
import { config } from 'config';
import { func, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Button as SharedButton, Context } from '../Button';
import { Body as ContentBody, Content, Header } from '../Content';
import { DebugError } from '../DebugError';
import { useTranslate } from '../useTranslate';

const { isDebug } = config;

const Body = styled(ContentBody)`
  display: grid;
  justify-items: center;
  text-align: center;

  img {
    border-radius: calc(${CustomProperty.BASE_UNIT} * 0.25);
    margin-bottom: ${CustomProperty.BASE_UNIT};
    max-width: 100%;
  }
`;

const Button = styled(SharedButton)`
  margin: 0 auto;
  width: auto;
`;

const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: 250px;
`;

const Container = styled.div`
  align-items: flex-start;
  display: grid;
  justify-items: center;
  max-width: calc(${CustomProperty.BASE_UNIT} * 40);
`;

const ErrorPage = ({ message, onFeedbackClick }) => {
  const t = useTranslate({
    component: 'error',
    namespace: 'error',
  });

  return (
    <Content>
      <Header title={t('title')} />
      <Body hasBreadcrumbs={false}>
        <Container>
          {isDebug && <DebugError message={message} />}
          <ImageContainer>
            <img src={officePanda} alt={t('officePanda')} />
          </ImageContainer>
          <p>{t('statement')}</p>
          <p>
            <Button
              context={Context.PRIMARY}
              onClick={onFeedbackClick}
              text={t('tellUsMore')}
            />
          </p>
        </Container>
      </Body>
    </Content>
  );
};

ErrorPage.propTypes = {
  message: string.isRequired,
  onFeedbackClick: func.isRequired,
};

export { ErrorPage };
