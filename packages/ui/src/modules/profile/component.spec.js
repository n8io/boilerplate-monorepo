import React from 'react';
import { render } from 'testHelpers';
import { Profile } from './component';

jest.mock('shared/Content');
jest.mock('shared/Page');

describe('<Profile/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Profile {...defaultProps} {...overrides} />);

  test('renders profile page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
