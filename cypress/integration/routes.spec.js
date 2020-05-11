describe('routes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('is the default route', () => {
    cy.location('pathname').should('eq', '/');
  });
});
