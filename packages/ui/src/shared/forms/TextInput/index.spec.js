import React from 'react';
import { render } from 'testHelpers';
import { TextInput } from '.';

jest.mock('../Input');

describe('<TextInput/>', () => {
  const defaultProps = {
    label: 'LABEL',
    name: 'NAME',
  };

  const renderComponent = overrides =>
    render(<TextInput {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
