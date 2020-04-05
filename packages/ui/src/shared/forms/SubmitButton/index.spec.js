import React from 'react';
import { FormContext } from 'react-hook-form';
import { render } from 'testHelpers';
import { SubmitButton } from '.';

jest.mock('../../Button');

describe('<SubmitButton/>', () => {
  const ariaLabel = 'LABEL';
  const defaultProps = {
    onClick: jest.fn().mockName('onClick'),
    text: ariaLabel,
  };

  // eslint-disable-next-line react/prop-types
  const wrapper = ({ children }) => <FormContext>{children}</FormContext>;

  const renderComponent = overrides =>
    render(<SubmitButton {...defaultProps} {...overrides} />, { wrapper });

  test('renders a submit button', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
