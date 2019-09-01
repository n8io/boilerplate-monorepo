import React from 'react';
import { render } from 'testHelpers';
import { Politeness } from 'types/politeness';
import { ScreenReaderNotification, domTestId } from '.';

describe('<ScreenReaderNotification/>', () => {
  it('renders properly', () => {
    const defaultProps = { children: <x-child /> };
    const { getByTestId } = render(
      <ScreenReaderNotification {...defaultProps} />
    );
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });

  it('renders politeness properly', () => {
    const defaultProps = {
      children: <x-child />,
      politeness: Politeness.ASSERTIVE,
    };
    const { getByTestId } = render(
      <ScreenReaderNotification {...defaultProps} />
    );
    const snapshot = getByTestId(domTestId);

    expect(snapshot).toMatchSnapshot();
  });
});
