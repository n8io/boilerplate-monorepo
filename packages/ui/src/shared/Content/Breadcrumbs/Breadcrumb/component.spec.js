import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from 'testHelpers';
import { domTestId, Breadcrumb } from '.';

jest.mock('styled-reset-advanced', () => () => '');

describe('<Breadcrumb/>', () => {
  it('renders properly', () => {
    const defaultProps = { text: 'TEXT', to: 'TO' };
    const { getByTestId } = render(
      <Router>
        <Breadcrumb {...defaultProps} />
      </Router>
    );
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
