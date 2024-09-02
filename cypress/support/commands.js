// <reference types="Cypress" />
/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "./selectors";


Cypress.Commands.add('login', (username = Cypress.env('username'), password = Cypress.env('password')) => {
  cy.step('Login to the system')
  cy.clickonLink("Log in")
  cy.get(selectors.loginPopupDialog).first().within((form) => {

    cy.get(selectors.loginEmailField).type(username).should('have.value',username)   
    cy.get(selectors.loginPasswordField).type(password).should('have.value',password)    
    cy.get(selectors.loginSubmitBtn).click();

  });
});

Cypress.Commands.add('clickonLink', (label) => {
  cy.get('a').contains(label).click();
})

Cypress.Commands.add('verifySiteLoaded', () => {
  cy.get('a[href="https://www.singersl.com/customer"]').should('be.visible');
})
