import { LogLevel } from '@boilerplate-monorepo/common';
import React from 'react';
import { render } from 'testHelpers';
import { LogLevelIcon } from '.';

describe('<LogLevelIcon/>', () => {
  const defaultProps = { type: LogLevel.INFO };

  const renderComponent = (overrides) =>
    render(<LogLevelIcon {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  LogLevel.values.forEach((level) => {
    test('renders the proper icon', () => {
      const { queryByTestId } = renderComponent({ type: level });

      expect(queryByTestId(level)).not.toBeNull();
    });
  });
});
