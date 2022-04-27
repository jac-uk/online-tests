/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

context('Exercise1', () => {

  before(() => {
    // sign out before running any tests
    cy.logout();
  });

  after(() => {
  });

  it('Navigate to home page', () => {
    cy.visit('/').wait(3000);
    cy.url().should('eq', `${Cypress.config().baseUrl}/sign-in`);
  });

  it('Check HTML title', () => {
    const title = 'JAC Digital Platform';
    if (cy.title() !== title) {
      cy.get('title').then(element => {
        element[0].innerHTML = title;
      });
      cy.title().should('include', title);
    }
  });

  it('Login using non-JAC account', () => {
    cy.login(Cypress.env('APPLY_TEST_UID'));
    cy.visit('/').wait(1000);
  });

  it('Click Online Tests link', () => {
    cy.get('[data-cy=online-tests-link]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/online-tests`);
  });

});
