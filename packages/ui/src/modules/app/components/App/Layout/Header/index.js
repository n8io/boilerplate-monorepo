import React from 'react';

const domTestId = 'Header';

const Header = () => (
  <header data-testid={domTestId}>
    <h1>Header</h1>
  </header>
);

export { domTestId, Header };
