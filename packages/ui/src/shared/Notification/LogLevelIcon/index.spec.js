import { LogLevel } from '@boilerplate-monorepo/common';
import React from 'react';
import { render } from 'testHelpers';
import { LogLevelIcon } from '.';

describe('<LogLevelIcon/>', () => {
  const defaultProps = {
    type: LogLevel.INFO,
  };

  const renderComponent = overrides =>
    render(<LogLevelIcon {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
