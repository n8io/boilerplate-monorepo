import React from 'react';
import { render } from 'testHelpers';
import { PasswordInput } from '.';

jest.mock('../Input');

describe('<PasswordInput/>', () => {
  const defaultProps = {
    label: 'LABEL',
    name: 'NAME',
  };

  const renderComponent = overrides =>
    render(<PasswordInput {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
