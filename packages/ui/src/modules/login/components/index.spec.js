import React from 'react';
import { render } from 'testHelpers';
import { Login } from '.';

jest.mock('shared/Content');
jest.mock('shared/Page');

jest.mock('./Form', () => ({
  Form: props => <x-Form {...props} />,
}));

describe('<Login/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Login {...defaultProps} {...overrides} />);

  test('renders login page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
