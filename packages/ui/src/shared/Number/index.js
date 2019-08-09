import { node, string } from 'prop-types';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';

const domTestId = 'Number';

const Styled = styled.span`
  font-family: ${({ theme }) => theme.site.fontFamilyNumerals};
  letter-spacing: 0.125rem;

  ${({ className }) => className}
`;

const Number = ({ className, value }) => {
  const theme = useContext(ThemeContext);

  return (
    <Styled
      aria-label={value}
      className={className}
      data-testid={domTestId}
      theme={theme}
    >
      {value}
    </Styled>
  );
};

Number.defaultProps = {
  className: undefined,
};

Number.propTypes = {
  className: string,
  value: node.isRequired,
};

export { domTestId, Number };
