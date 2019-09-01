import React from 'react';
import { render } from 'testHelpers';
import { Dashboard, domTestId } from './component';

jest.mock('react-helmet', () => () => '');

describe('<Dashboard/>', () => {
  it('renders properly', () => {
    const defaultProps = {};
    const { getByTestId } = render(<Dashboard />, defaultProps);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
