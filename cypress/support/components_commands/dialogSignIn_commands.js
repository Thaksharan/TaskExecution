/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "../selectors";

// Cypress.Commands.add('verifySignInPopupDisplayed',()=>{
//   cy.contains('.modal-title','Sign In').should('be.visible')
// })



// Cypress.Commands.add('closeAdvertisementPopup',()=>{
//   cy.wait(2000)
//   cy.get('body').then(($el) => {
//     if ($el.find('#myPopupPromo[style*="display: block"]').length) {
//       cy.get('span#closeModal').click()
//     }else {
//       cy.log("No popup on page");
//     }
//   })
// })

  Cypress.Commands.add('login', (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.step('Login to the system')
    cy.clickonLink("Log in",{timeout:10000})
    cy.get('.user-login-container.wrapper').first().within((form) => {
      if (username != '' && password != '') {
        cy.get('input#email').type(username).should('have.value',username)   
        cy.get('input#password').type(password).should('have.value',password)    
      } else {
        cy.fixture('validLogin').then(user => {
          cy.get('input#email').type(user.username.toString(),{timeout:10000}).should('have.value',user.username)
          cy.get('input#password').type(user.password.toString()).should('have.value',user.password)
        });
      } 
      
      cy.get('#login-submit').click();
    });
  });