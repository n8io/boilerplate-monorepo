import React from 'react';
import { render } from 'testHelpers';
import { RadioInput } from '.';

describe('<RadioInput/>', () => {
  const options = [
    {
      label: 'LABEL',
      value: 'VALUE',
    },
  ];

  const defaultProps = {
    label: 'LABEL',
    name: 'NAME',
    options,
  };

  const renderComponent = (overrides) =>
    render(<RadioInput {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
