import * as Config from 'config';
import React from 'react';
import { render } from 'testHelpers';
import { Features } from '.';

const configKey = 'SPLIT_IO_API_KEY';

jest.mock('@splitsoftware/splitio-react', () => ({
  SplitFactory: (props) => (
    <x-SplitFactory {...props} data-testid="split-factory" />
  ),
}));

describe('<Features/>', () => {
  const authorizationKey = 'AUTHORIZATION_KEY';

  const defaultProps = {
    children: <x-Child data-testid="child" />,
  };

  const renderComponent = (overrides) =>
    render(<Features {...defaultProps} {...overrides} />);

  describe('when no split key is set', () => {
    beforeEach(() => {
      td.replace(Config, 'config', { [configKey]: null });
    });

    test('should return children', () => {
      const { queryByTestId } = renderComponent();

      expect(queryByTestId('split-factory')).toBeNull();
      expect(queryByTestId('child')).not.toBeNull();
    });
  });

  describe('when a split key is set', () => {
    beforeEach(() => {
      td.replace(Config, 'config', { [configKey]: authorizationKey });
    });

    test('should return children wrapped in a split factory', () => {
      const { queryByTestId } = renderComponent();

      expect(queryByTestId('split-factory')).not.toBeNull();
      expect(queryByTestId('child')).not.toBeNull();
    });
  });
});
