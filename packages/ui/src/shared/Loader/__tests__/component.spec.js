import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { domTestId, Loader } from '..';

jest.mock('shared/useTranslate');

describe('<Loader/>', () => {
  const defaultProps = {};

  afterEach(cleanup);

  it('renders properly', () => {
    const { getByTestId } = render(<Loader {...defaultProps} />);
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
