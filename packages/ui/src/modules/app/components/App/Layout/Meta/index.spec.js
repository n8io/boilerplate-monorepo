import * as Config from 'config';
import React from 'react';
import { render } from 'testHelpers';
import { Meta } from '.';

describe('<Meta/>', () => {
  const defaultConfig = {
    COMMIT_MESSAGE: 'COMMIT_MESSAGE',
    RELEASE: 'RELEASE',
  };

  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Meta {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    td.replace(Config, 'config', defaultConfig);

    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('when there is commit metadata', () => {
    const COMMIT_HASH = 'COMMIT_HASH';

    test('renders release metadata', () => {
      td.replace(Config, 'config', {
        ...defaultConfig,
        COMMIT_HASH,
      });

      const { queryByTestId } = renderComponent();

      expect(queryByTestId('commit')).not.toBeNull();
    });
  });

  describe('when there is NOT commit metadata', () => {
    const COMMIT_HASH = undefined;

    test('renders release metadata', () => {
      td.replace(Config, 'config', {
        ...defaultConfig,
        COMMIT_HASH,
      });

      const { queryByTestId } = renderComponent();

      expect(queryByTestId('commit')).toBeNull();
    });
  });
});
