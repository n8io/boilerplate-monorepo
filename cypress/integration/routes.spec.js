describe('routes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // eslint-disable-next-line jest/expect-expect
  it('is the default route', () => {
    cy.location('pathname').should('eq', '/');
  });
});
