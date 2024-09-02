/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "./selectors";

//cypress commands to verify user successfully logged in and site loaded
Cypress.Commands.add('verifySiteLoaded', () => {
  
  cy.get('a[href="https://www.singersl.com/customer"]').should('be.visible');

})
