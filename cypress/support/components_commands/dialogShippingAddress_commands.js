/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
//import selectors from "../selectors";

//custom command to verifyShippingAddressdialog
Cypress.Commands.add('verifyShippingAddressdialog', () => {
    cy.contains('.modal-header','Shipping Address').should('be.visible')
  })

//custom command to typeDetailsOnShippingDialog
Cypress.Commands.add('typeDetailsOnShippingDialog', (attn,addressLine,city,state,zipCode,phoneNo) => {
    // cy.get('#name').clear().type(attn)
    // cy.get('#addressLine').clear().type(addressLine)
    // cy.get('#city').clear().type(city)
    // cy.get('#states-autocomplete').clear().type(state)
    // cy.get('#zipCode').clear().type(zipCode)
    // cy.get('#phoneNo').clear().type(phoneNo)

    cy.get('.shipping-address-popup').should('be.visible').within(() => {
      cy.get('#name').clear().type(attn)
      cy.get('#addressLine').clear().type(addressLine)
      cy.get('#city').clear().type(city)
      cy.get('#states-autocomplete').clear().type(state)
      cy.get('#zipCode').clear().type(zipCode)
      cy.get('#phoneNo').clear().type(phoneNo)
    })
  })

//custom command to clickDoneOnShippingDialog
Cypress.Commands.add('clickDoneOnShippingDialog', () => {
    cy.contains('Done').click()
  })


