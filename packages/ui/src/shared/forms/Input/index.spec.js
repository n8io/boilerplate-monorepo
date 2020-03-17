import React from 'react';
import { render } from 'testHelpers';
import { Input } from '.';

jest.mock('../ValidationError');

describe('<Input/>', () => {
  const defaultProps = {
    label: 'LABEL',
    name: 'NAME',
  };

  const renderComponent = overrides =>
    render(<Input {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('forwards other props', () => {
    const otherProps = {
      className: 'CLASS_NAME',
      'data-testid': 'DATA_TEST_ID',
    };

    const { getByTestId } = renderComponent(otherProps);

    expect(getByTestId(otherProps['data-testid'])).not.toBeNull();
  });

  test('sets aria-label properly', () => {
    const otherProps = {
      'aria-label': 'ARIA_LABEL',
      'data-testid': 'DATA_TEST_ID',
      label: 'DIFFERENT_THAN_ARIA_LABEL',
    };

    const { getByTestId, getByText } = renderComponent(otherProps);

    expect(getByTestId(otherProps['data-testid'])).toHaveAttribute(
      'aria-label',
      otherProps['aria-label']
    );

    expect(getByText(otherProps.label)).not.toBeNull();
  });
});
