import { LogLevel } from '@boilerplate-monorepo/common';
import { node } from 'prop-types';
import { prop } from 'ramda';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { LogLevelIcon } from './LogLevelIcon';

const StyledIcon = styled.span`
  margin-right: 0.5rem;
`;

const Container = styled.div`
  padding: 0 calc(0.5 * ${CustomProperty.BASE_UNIT});
`;

const Notification = ({ children, type }) => {
  const notify = prop(type.toLowerCase(), toast);

  const Content = () => (
    <Container>
      <StyledIcon>
        <LogLevelIcon type={type} />
      </StyledIcon>
      {children}
    </Container>
  );

  useEffect(() => {
    notify(Content);
  }, []);

  return null;
};

Notification.defaultProps = {
  type: LogLevel.INFO,
};

Notification.propTypes = {
  children: node.isRequired,
  type: LogLevel.propTypes,
};

export { Notification };
