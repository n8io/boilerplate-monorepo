import * as Config from 'config';
import React from 'react';
import { render } from 'testHelpers';
import { Meta } from '.';

describe('<Meta/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Meta {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    td.replace(Config, 'config', {
      RELEASE: 'RELEASE',
      RELEASE_HASH: 'RELEASE_HASH',
    });

    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
