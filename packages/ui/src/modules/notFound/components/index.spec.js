import React from 'react';
import { render } from 'testHelpers';
import { NotFound } from '.';

jest.mock('shared/Content');
jest.mock('shared/Page');

describe('<NotFound/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<NotFound {...defaultProps} {...overrides} />);

  test('renders not found page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
