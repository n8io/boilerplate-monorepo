import { Input as InputType } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { Input } from '../Input';

const TextInput = props => <Input {...props} type={InputType.TEXT} />;

TextInput.defaultProps = Input.defaultProps;
TextInput.propTypes = Input.propTypes;

export { TextInput };
