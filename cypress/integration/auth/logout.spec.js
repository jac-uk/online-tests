/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

context('Logout', () => {

  before(() => {
    // before running our tests make sure we are logged out and on the homepage
    cy.logout();
    cy.visit('/').wait(3000); // in case the page content takes a while to render on the Browser
  });

  // if a session times-out the user should be taken to the sign-in page
  it('auto-redirect after session timeout', () => {
    cy.login(Cypress.env('APPLY_TEST_UID'));
    cy.visit('/online-tests').wait(3000); // in case the page content takes a while to render on the Browser
    cy.logout(); // simulate a timeout, by logging the user out programatically
    cy.reload().wait(3000);
    cy.url().should('eq', `${Cypress.config().baseUrl}/sign-in`);
  });

  // if the user logs out manually they should be redirected to the vacancies page on the apply site
  it('auto-redirect after logout', () => {
    cy.login(Cypress.env('APPLY_TEST_UID'));
    cy.visit('/online-tests').wait(3000); // in case the page content takes a while to render on the Browser
    cy.get('.info-btn--header--sign-out').click();
    cy.url().should('eq', `${Cypress.config().applyUrl}/vacancies`);
  });

});
