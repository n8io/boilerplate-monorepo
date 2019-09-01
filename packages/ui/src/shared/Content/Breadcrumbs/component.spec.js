import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from 'testHelpers';
import { domTestId, Breadcrumbs } from '.';

jest.mock('styled-reset-advanced', () => () => '');

describe('<Breadcrumbs/>', () => {
  it('renders properly', () => {
    const defaultProps = { children: <x-child /> };
    const { getByTestId } = render(
      <Router>
        <Breadcrumbs {...defaultProps} />
      </Router>
    );
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
