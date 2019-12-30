import { SkipToDestination } from '@boilerplate-monorepo/ui-common';
import React from 'react';
import { render } from 'testHelpers';
import * as Document from 'types/document';
import { Header } from '.';

jest.mock('../../PageTitle', () => ({
  PageTitle: props => <x-PageTitle {...props} />,
}));

describe('<Header/>', () => {
  const text = 'CHILDREN';
  const defaultProps = {
    children: text,
    title: 'TITLE',
  };

  const renderComponent = overrides =>
    render(<Header {...defaultProps} {...overrides} />);

  const getElementById = jest
    .fn(() => ({
      addEventListener: () => null,
      removeEventListener: () => null,
    }))
    .mockName('getElementById');

  beforeEach(() => {
    td.replace(Document, 'document', { getElementById });
  });

  test('renders children', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders an h1 with an id', () => {
    const { container } = renderComponent();

    expect(
      container.querySelector(`h1#${SkipToDestination.MAIN}`)
    ).not.toBeEmpty();
  });
});
