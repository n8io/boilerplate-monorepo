import { LogLevel } from '@boilerplate-monorepo/common';
import { node } from 'prop-types';
import { prop } from 'ramda';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { LogLevelIcon } from './LogLevelIcon';

const Container = styled.div`
  float: left;
  font-size: calc(0.9 * ${CustomProperty.BASE_UNIT});
  margin: 0 calc(0.5 * ${CustomProperty.BASE_UNIT}) 0
    calc(3.5 * ${CustomProperty.BASE_UNIT});
  position: relative;
`;

const IconBackground = styled.div`
  font-size: 6rem;
  left: -2.5rem;
  margin-left: calc(-3.5 * ${CustomProperty.BASE_UNIT});
  opacity: 0.3;
  position: absolute;
  top: -2.5rem;
  transform: translate(0, 0);
`;

const Notification = ({ children, type }) => {
  const notify = prop(type.toLowerCase(), toast);

  const Content = () => (
    <Container>
      <IconBackground>
        <LogLevelIcon type={type} />
      </IconBackground>
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
