import React from 'react';
import { Body, Header } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';
import { Form } from './Form';

const Find = () => {
  const t = useTranslate({
    component: 'user',
    namespace: 'user',
  });

  return (
    <>
      <Header title={t('forgotPassword')} />
      <Body hasBreadcrumbs={false}>
        <Form />
      </Body>
    </>
  );
};

export { Find };
