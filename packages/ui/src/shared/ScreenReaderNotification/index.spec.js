import { A11y } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { render } from 'testHelpers';
import { ScreenReaderNotification } from '.';

const { Politeness } = A11y;

describe('<ScreenReaderNotification/>', () => {
  const politeness = Politeness.POLITE;
  const defaultProps = {
    children: 'CHILDREN',
  };

  const renderComponent = (overrides) =>
    render(<ScreenReaderNotification {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('it has the proper aria attributes', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toHaveAttribute('aria-live', politeness);
  });
});
