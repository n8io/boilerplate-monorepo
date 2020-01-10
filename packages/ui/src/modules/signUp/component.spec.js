import React from 'react';
import { render } from 'testHelpers';
import { SignUp } from './component';

jest.mock('shared/Content');
jest.mock('shared/Page');

describe('<SignUp/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<SignUp {...defaultProps} {...overrides} />);

  test('renders about page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
