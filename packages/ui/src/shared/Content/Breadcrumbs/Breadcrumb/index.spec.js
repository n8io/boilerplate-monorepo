import React from 'react';
import { render } from 'testHelpers';
import { Breadcrumb } from '.';

describe('<Breadcrumb/>', () => {
  const text = 'TEXT';
  const navLinkProps = {
    to: '/TO',
  };
  const defaultProps = {
    ...navLinkProps,
    text,
  };

  const renderComponent = (overrides) =>
    render(<Breadcrumb {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a link when it is not the end', () => {
    const { container } = renderComponent({ isEnd: false });
    const link = container.querySelector('a');

    expect(link).not.toBeEmpty();
  });

  test('renders a span when it is the end', () => {
    const { container } = renderComponent({ isEnd: true });
    const span = container.querySelector('span');

    expect(span).not.toBeEmpty();
  });
});
