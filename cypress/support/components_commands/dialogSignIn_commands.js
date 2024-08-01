/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "../selectors";

Cypress.Commands.add('verifySignInPopupDisplayed',()=>{
  cy.contains('.modal-title','Sign In').should('be.visible')
})



Cypress.Commands.add('closeAdvertisementPopup',()=>{
  cy.wait(2000)
  cy.get('body').then(($el) => {
    if ($el.find('#myPopupPromo[style*="display: block"]').length) {
      cy.get('span#closeModal').click()
    }else {
      cy.log("No popup on page");
    }
  })
})

//command to Login
// Cypress.Commands.add('login', (fileName, username = '', password = '') => {
//     cy.step('Login to the system')
//     cy.clickonLink("Sign In",{timeout:10000})
//     cy.wait(1000)
//     cy.get('.modal-dialog',{timeout:10000}).first().within((form) => {
//       cy.fixture(fileName).then(user => {
//         if (username === '' && password === '') {
//           cy.get('#user-email').type(user.username.toString(),{timeout:10000}).should('have.value',user.username)
  
//           cy.get('#user-password').type(user.password.toString()).should('have.value',user.password)
          
//         } else {
//           cy.get('#user-email').type(username)
//           cy.get('#user-password').type(password)
//         } 
//       });
  
//       cy.clickOnButton("SIGN IN");
  
//     });
//   });
// const username_env = Cypress.env('username')
// const password_env=Cypress.env('password')
  Cypress.Commands.add('login', (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.step('Login to the system')
    cy.closeAdvertisementPopup()
    cy.clickonLink("Sign In",{timeout:10000})
    cy.wait(1000)
    cy.get('.modal-dialog',{timeout:10000}).first().within((form) => {
      if (username != '' && password != '') {
        cy.get(selectors.txtEmail).type(username).should('have.value',username)   
        cy.get(selectors.txtPassword).type(password).should('have.value',password)    
      } else {
        cy.fixture('validLogin').then(user => {
          cy.get(selectors.txtEmail).type(user.username.toString(),{timeout:10000}).should('have.value',user.username)
          cy.get(selectors.txtPassword).type(user.password.toString()).should('have.value',user.password)
        });
      } 
      
  
      cy.clickOnButton("SIGN IN");
  
    });
  });

  //command to type username and password
Cypress.Commands.add('setCredentials', (username,password) => {
    cy.get('.modal-dialog').first().within((form) => {
      cy.get(selectors.txtEmail).type(username)
      cy.get(selectors.txtPassword).type(password)
      
    });
  });