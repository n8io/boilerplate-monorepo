import { render } from '@testing-library/react';
import * as Config from 'config';
import React from 'react';
import { VersionLink } from '.';

const renderComponent = () => render(<VersionLink />);

describe('<VersionLink />', () => {
  describe('when there is a release', () => {
    beforeEach(() => {
      td.replace(Config, 'config', {
        RELEASE: 'RELEASE',
      });
    });

    test('renders the release properly', () => {
      expect(renderComponent().container.firstChild).toMatchSnapshot();
    });
  });

  describe('when there is a commit hash', () => {
    beforeEach(() => {
      td.replace(Config, 'config', {
        COMMIT_HASH: 'COMMIT_HASH',
        RELEASE: 'RELEASE',
      });
    });

    test('renders the release properly', () => {
      expect(renderComponent().container.firstChild).toMatchSnapshot();
    });
  });
});
