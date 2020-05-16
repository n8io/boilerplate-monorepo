import { users } from '../fixtures/users';

describe('routes', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('resolves to the login route', () => {
    cy.location('pathname').should('eq', '/login');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('handles a valid login', () => {
    const { password, username } = users.valid;

    cy.login(username, password);
    cy.location('pathname').should('eq', '/');
  });

  it('handles an invalid login', () => {
    const password = 'INVALID';
    const { username } = users.valid;

    cy.login(username, password);
    cy.get('div[data-testid="notification"]').should('be.visible');
  });
});
