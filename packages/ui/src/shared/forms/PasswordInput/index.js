import { Input as InputType } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { Input } from '../Input';

const PasswordInput = props => <Input {...props} type={InputType.PASSWORD} />;

PasswordInput.defaultProps = Input.defaultProps;
PasswordInput.propTypes = Input.propTypes;

export { PasswordInput };
