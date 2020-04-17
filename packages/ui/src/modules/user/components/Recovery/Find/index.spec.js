import React from 'react';
import { render } from 'testHelpers';
import { Find } from '.';

jest.mock('shared/Button');
jest.mock('shared/Content');

jest.mock('./Form', () => ({
  Form: props => <x-Form {...props} />,
}));

describe('<Find/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Find {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
