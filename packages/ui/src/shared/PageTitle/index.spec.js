import React from 'react';
import { render } from 'testHelpers';
import { PageTitle } from '.';

jest.mock('react-helmet');

describe('<PageTitle/>', () => {
  const defaultProps = {
    title: 'TITLE',
  };

  const renderComponent = overrides =>
    render(<PageTitle {...defaultProps} {...overrides} />);

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
