/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

context('Online Tests', () => {

  let qualifyingTestId = '';
  let expiredTimeMin = 0;

  before(() => {
    // before running our tests make sure we are logged out and on the homepage
    cy.logout();
    cy.visit('/').wait(3000);
    cy.login(Cypress.env('APPLY_TEST_UID'));
    cy.visit('/online-tests');
  });

  it('Check online-tests page', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/online-tests`);
    cy.get('.govuk-heading-xl').contains('Online tests');
  });

  it('Check that the user can view the list of Open QTs', () => {
    cy.get('.info-btn--tab--open').contains('Open').click();
    cy.get('.govuk-heading-l').contains('Open');
  });

  it('Check that the user can view the list of Future QTs', () => {
    cy.get('.info-btn--tab--future').contains('Future').click();
    cy.get('.govuk-heading-l').contains('Future');
  });

  it('Check that the user can view the list of Past QTs', () => {
    cy.get('.info-btn--tab--past').contains('Past').click();
    cy.get('.govuk-heading-l').contains('Past');
  });

  it('Check that the user can view an individual open QT', () => {
    cy.get('.info-btn--tab--open')
      .contains('Open')
      .click()
      .wait(1000)
      .then($element => {
        let el = Cypress.$('[class^="info-btn--qualifying-tests--to--"]');
        if (el.length > 0) {
          cy.get('[class^="info-btn--qualifying-tests--to--"]')
            .then($element => {
              if ($element.length > 0) {
                const $el = $element[0];
                const href = $el.href;
                qualifyingTestId = href.match(/online-tests\/(\w+)\/information/)[1];
                if (qualifyingTestId) {
                  cy.get($el).click();
                  cy.url().should('eq', `${Cypress.config().baseUrl}/online-tests/${qualifyingTestId}/information`);
                }
              }
            });
        }
      });
  });

  it('Check that the user can start an QT', () => {
    if (!qualifyingTestId) return;

    cy.contains(/^.*(You have )|( minutes to complete this test.).*$/)
      .then($element => {
        if ($element.length > 0) {
          const $el = $element[0];
          const text = $el.innerText;
          const match = text.match(/You have (\w+) minutes to complete this test./);
          expiredTimeMin = match[1] ? match[1] : expiredTimeMin;
        }
      });

    let checkboxEl = Cypress.$('#confirm-checkbox');
    if (checkboxEl.length > 0) {
      cy.get('#confirm-checkbox').click();
    }
    cy.get('.info-btn--start-button--start-now-or-continue').contains(/^.*(Start now|Continue).*$/).click();
  });

  it.skip('If someone changes their local clock, check it does not mess up the timer for the exercise', () => {
    if (!qualifyingTestId) return;

  });

  it(`Check that the QT ends automatically when the user's time runs out.`, () => {
    if (!qualifyingTestId) return;

    cy.clock(new Date());
    cy.tick(expiredTimeMin * 60 * 1000);
    cy.get('.govuk-heading-m').contains('Time has expired').siblings().get('.info-btn--modal--success').contains('I understand').click({ force: true });
    cy.get('.govuk-panel__title').contains('Test Submitted');
    cy.url().should('eq', `${Cypress.config().baseUrl}/online-tests/${qualifyingTestId}/submitted`);
  });

  it('Check that the user cannot submit a blank test paper', () => {
    if (!qualifyingTestId) return;

    cy.visit(`${Cypress.config().baseUrl}/online-tests/${qualifyingTestId}/information`)
      .wait(3000)
      .then(() => {
        let checkboxEl = Cypress.$('#confirm-checkbox');
        if (checkboxEl.length > 0) {
          cy.get('#confirm-checkbox').click();
        }
      });
    cy.get('.info-btn--start-button--start-now-or-continue').contains(/^.*(Start now|Continue).*$/).click();

    cy.get('.govuk-textarea').first().clear();
    cy.contains('Save and continue').should('be.disabled');
    cy.get('.govuk-textarea').first().type('Sample answer');
    cy.contains('Save and continue').should('not.be.disabled').click();
  });

  it('Check that the user submit a completed test paper', () => {
    if (!qualifyingTestId) return;

    cy.get('.govuk-button--success').contains('Submit answers').click();
    cy.get('.modal-mask').contains('Are you sure?').siblings().get('.info-btn--modal--success').contains('Submit answers').click({ force: true });
    cy.get('.govuk-panel__title').contains('Test Submitted');
  });

  it('Check you cannot edit a submitted test', () => {
    if (!qualifyingTestId) return;

    cy.visit(`${Cypress.config().baseUrl}/online-tests/${qualifyingTestId}/information`);
    cy.url().should('eq', `${Cypress.config().baseUrl}/online-tests`);
  });

});
