import React from 'react';
import { Button, Context, Size } from '../../../../Button';

const ToggleButton = props => (
  <Button {...props} context={Context.PRIMARY} size={Size.SMALL} />
);

export { ToggleButton };
