import React from 'react';
import { render } from 'testHelpers';
import { Breadcrumbs } from '.';

jest.mock('./Breadcrumb', () => ({
  Breadcrumb: (props) => <x-Breadcrumb {...props} />,
}));

describe('<Breadcrumbs/>', () => {
  const text = 'TEXT';
  const defaultProps = {
    children: <x-child>{text}</x-child>,
  };

  const renderComponent = (overrides) =>
    render(<Breadcrumbs {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a link when it is not the end', () => {
    const { getByText } = renderComponent();

    expect(getByText(text)).not.toBeEmpty();
  });
});
