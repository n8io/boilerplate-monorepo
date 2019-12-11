describe('routes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('is the default route', () => {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
});
