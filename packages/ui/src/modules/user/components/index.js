import React from 'react';
import { Content } from 'shared/Content';
import { Page } from 'shared/Page';
import { Routing } from './Routing';

const User = () => (
  <Page>
    <Content>
      <Routing />
    </Content>
  </Page>
);

export { User };
