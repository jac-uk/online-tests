/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

context('Online Tests', () => {

  before(() => {
    // before running our tests make sure we are logged out and on the homepage
    cy.logout();
    cy.visit('/').wait(3000);
    cy.login(Cypress.env('APPLY_TEST_UID'));
    cy.visit('/online-tests');
  });

});
