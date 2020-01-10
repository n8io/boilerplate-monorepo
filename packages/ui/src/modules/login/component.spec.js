import React from 'react';
import { render } from 'testHelpers';
import { Login } from './component';

jest.mock('shared/Content');
jest.mock('shared/Page');

describe('<Login/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Login {...defaultProps} {...overrides} />);

  test('renders about page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
