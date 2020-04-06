import React from 'react';
import { Content } from 'shared/Content';
import { Page } from 'shared/Page';
import { Account } from './Account';

const User = () => (
  <Page>
    <Content>
      <Account />
    </Content>
  </Page>
);

export { User };
