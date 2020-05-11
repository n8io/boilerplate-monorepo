import React from 'react';
import { render } from 'testHelpers';
import { About } from '.';

jest.mock('shared/Content');
jest.mock('shared/Page');

describe('<About/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<About {...defaultProps} {...overrides} />);

  test('renders about page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
