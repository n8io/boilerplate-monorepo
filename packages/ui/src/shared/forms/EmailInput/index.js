import { Input as InputType } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { Input } from '../Input';

const EmailInput = props => <Input {...props} type={InputType.EMAIL} />;

EmailInput.defaultProps = Input.defaultProps;
EmailInput.propTypes = Input.propTypes;

export { EmailInput };
