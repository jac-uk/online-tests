/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

context('Login', () => {

  before(() => {
    // before running our tests make sure we are logged out and on the homepage
    cy.logout();
    cy.visit('/').wait(3000); // in case the page content takes a while to render on the Browser
  });

  it('Check that user is redirected to the sign-in page when they first go to the homepage (i.e. because they are not logged in)', () => {
    cy.visit('/').wait(3000);
    cy.url().should('eq', `${Cypress.config().baseUrl}/sign-in`);
  });

  it('Check the user can log in', () => {
    cy.login(Cypress.env('APPLY_TEST_UID'));
    cy.visit('/').wait(3000);
    cy.contains('You are now signed in as');
  });

  it('Check the user can log out', () => {
    cy.login(Cypress.env('APPLY_TEST_UID'));
    cy.visit('/').wait(3000);
    cy.get('.info-btn--header--sign-out').contains('Sign Out').click();
    cy.url().should('eq', `${Cypress.config().applyUrl}/vacancies`);
  });

  it('Check that the user cannot access the online tests page when they are not logged in', () => {
    cy.visit('/online-tests');
    cy.url().should('eq', `${Cypress.config().baseUrl}/sign-in`);
  });

  it('Check that the user can access the online tests page when they are logged in', () => {
    cy.login(Cypress.env('APPLY_TEST_UID'));
    cy.visit('/').wait(3000);
    cy.url().should('eq', `${Cypress.config().baseUrl}/online-tests`);
  });

});
