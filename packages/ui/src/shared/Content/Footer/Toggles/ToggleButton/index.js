import React from 'react';
import styled from 'styled-components/macro';
import { Button, Context, Size } from '../../../../Button';

const domTestId = 'ToggleButton';

const ProxyButton = styled(Button)`
  align-items: center;
  display: grid;
  justify-items: center;
  text-align: center;
`;

const ToggleButton = props => (
  <ProxyButton {...props} context={Context.PRIMARY} size={Size.SMALL} />
);

export { ToggleButton, domTestId };
