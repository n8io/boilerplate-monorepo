import React from 'react';
import { render } from 'testHelpers';
import { Main } from '.';

jest.mock('shared/Content');
jest.mock('shared/Link');

describe('<Main/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Main {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
