import React from 'react';
import { render } from 'testHelpers';
import { EmailInput } from '.';

jest.mock('../Input');

describe('<EmailInput/>', () => {
  const defaultProps = {
    label: 'LABEL',
    name: 'NAME',
  };

  const renderComponent = overrides =>
    render(<EmailInput {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
