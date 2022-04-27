/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

// The IDs below need to be for suitable database records
// i.e. if the application document has no exerciseId defined all tests will fail anyway
// because of the bad data!
const applicationId = 'bqtwu9opOL1yXwSnhesc';
const exerciseId = '3CI2dLS5qaa0iaCKxFBD';

const routes = [
  `/online-tests`,
  // TODO - Complete the list of routes
];

context('Online Tests', () => {

  before(() => {
    // before running our tests make sure we are logged out and on the homepage
    cy.logout();
    cy.visit('/').wait(3000);
  });

  it('Should redirect to sign-in page when logged out', () => {
    routes.forEach((route) => {
      cy.visit(route).wait(1000);
      cy.url().should('eq', `${Cypress.config().baseUrl}/sign-in`);
    });
  });

  it('Go to page when logged in', () => {
    cy.login(Cypress.env('APPLY_TEST_UID'));
    routes.forEach((route) => {
      cy.visit(route);
      cy.get('.govuk-button').contains('Sign Out');
      cy.url().should('eq', `${Cypress.config().baseUrl}${route}`);
    });
  });

});
