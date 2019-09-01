import React from 'react';
import { render } from 'testHelpers';
import { Button, domTestId } from '.';
import { Size } from './sizes';
import { Context } from './variants';

describe('<Button/>', () => {
  it('renders children properly', () => {
    const defaultProps = { children: <x-child />, label: 'LABEL' };
    const { getByTestId } = render(<Button {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });

  it('renders primary context properly', () => {
    const defaultProps = {
      context: Context.PRIMARY,
      label: 'LABEL',
      text: 'TEXT',
    };
    const { getByTestId } = render(<Button {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });

  it('renders menu item context properly', () => {
    const defaultProps = {
      context: Context.MENU_ITEM,
      label: 'LABEL',
      text: 'TEXT',
    };
    const { getByTestId } = render(<Button {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });

  it('renders small size context properly', () => {
    const defaultProps = {
      size: Size.SMALL,
      text: 'TEXT',
    };
    const { getByTestId } = render(<Button {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });

  it('renders default size context properly', () => {
    const defaultProps = {
      size: Size.DEFAULT,
      text: 'TEXT',
    };
    const { getByTestId } = render(<Button {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });

  it('renders large size context properly', () => {
    const defaultProps = {
      size: Size.LARGE,
      text: 'TEXT',
    };
    const { getByTestId } = render(<Button {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
