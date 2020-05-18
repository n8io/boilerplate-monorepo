import React from 'react';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: grid;
  height: 100%;
  justify-items: center;
  position: relative;
  width: 100%;
`;

const NoData = () => {
  const t = useTranslate();

  return (
    <Container>
      <div>{t('noDataToDisplay')}</div>
    </Container>
  );
};

export { NoData };
