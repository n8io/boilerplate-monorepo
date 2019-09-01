import React from 'react';
import { render } from 'testHelpers';
import { NotFound, domTestId } from './component';

describe('<NotFound/>', () => {
  it('renders properly', () => {
    const defaultProps = { history: { goBack: jest.fn().mockName('goBack') } };
    const { getByTestId } = render(<NotFound {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
