import * as Config from 'config';
import React from 'react';
import { render } from 'testHelpers';
import { Footer } from '.';

jest.mock('./Toggles', () => ({
  Toggles: (props) => <x-Toggles {...props} />,
}));

jest.mock('./VersionLink', () => ({
  VersionLink: (props) => <x-VersionLink {...props} />,
}));

describe('<Footer/>', () => {
  const defaultProps = {
    children: <x-child />,
  };

  const renderComponent = (overrides) =>
    render(<Footer {...defaultProps} {...overrides} />);

  beforeEach(() => {
    td.replace(Config, 'config', {
      copyrightYear: '1900',
    });
  });

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
