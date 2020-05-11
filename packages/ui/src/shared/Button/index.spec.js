import React from 'react';
import { render } from 'testHelpers';
import { Button } from '.';
import { Type } from './type';

jest.mock('../Loader');

describe('<Button/>', () => {
  const ariaLabel = 'LABEL';
  const defaultProps = {
    onClick: jest.fn().mockName('onClick'),
    text: ariaLabel,
  };

  const renderComponent = (overrides) =>
    render(<Button {...defaultProps} {...overrides} />);

  test('renders a button', () => {
    const { getByRole } = renderComponent();

    expect(getByRole(Type.BUTTON)).not.toBeEmpty();
  });

  test('passes other props', () => {
    const className = 'CLASS_NAME';
    const title = 'TITLE';
    const otherProp = 'x-other-prop';
    const { getByRole } = renderComponent({
      className,
      [otherProp]: otherProp,
      title,
    });
    const button = getByRole(Type.BUTTON);

    expect(button).toHaveClass(className);
    expect(button).toHaveAttribute(otherProp, otherProp);
    expect(button).toHaveAttribute(title, title);
  });

  test('has an aria label', () => {
    const { getByLabelText } = renderComponent();

    expect(getByLabelText(ariaLabel)).not.toBeEmpty();
  });

  test('has aria disabled when disabled', () => {
    const disabled = true;
    const { getByRole } = renderComponent({ disabled });
    const button = getByRole(Type.BUTTON);

    expect(button).toHaveAttribute('aria-disabled', disabled.toString());
    expect(button).toBeDisabled();
  });
});
