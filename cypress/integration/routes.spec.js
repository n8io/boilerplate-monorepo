describe('routes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('is the default route', () => {
    return cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
});
