import React from 'react';
import { render } from 'testHelpers';
import { Main } from '.';

jest.mock('../../Router', () => ({
  // eslint-disable-next-line react/display-name
  Router: props => <x-Router {...props} />,
}));

describe('<Main/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Main {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
