/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "../selectors.js";

Cypress.Commands.add('verifyCountrySelectorPopupDisplayed',()=>{
  cy.step('verify county selector pop-up displayed')
  cy.get(selectors.dialogCountryPopup).should("be.visible")
})

//country selector popup
Cypress.Commands.add('verifyCountrySelectorPopup',()=>{
    cy.step('verify county selector pop-up in logged out state')  
    //verify table data
    cy.get('.blueTable')         // get table
    .find('tr th').eq(0)               // first row/coulumn
    .should('contain', 'Country')  // criteria to check 

    cy.get('.blueTable')         // get table
    .find('tr th').eq(1)               // second row/column
    .should('contain', 'State Code')  // criteria to check 

    cy.get('.blueTable')         // get table
    .find('tr th').eq(2)               // second row/column
    .should('contain', 'County Name')  // criteria to check 

    cy.contains('.modal-footer a','Continue').should('be.visible')
    cy.contains('.modal-footer a','Login').should('be.visible')
    cy.contains('label','All Regions').should('be.visible')

    // cy.verifyLink('Continue')
    // cy.verifyLink('Login')
    // cy.verifyLink('All Regions')
  })

//enter Country In CountrySelectorPopup
Cypress.Commands.add('enterCountryInCountrySelectorPopup',(country)=>{
    cy.step('Fill the county selector pop-up')
    cy.get(selectors.txtCountry).should("be.visible").type(country)
  })

//enter state code In CountrySelectorPopup
Cypress.Commands.add('enterStateCodeInCountrySelectorPopup',(statecode)=>{
  cy.step('Fill the statecode selector pop-up')
  cy.get(selectors.txtStateCode).should("be.visible").type(statecode)
})

//enter country name In CountrySelectorPopup
Cypress.Commands.add('enterCountyNameInCountrySelectorPopup',(countyName)=>{
  cy.step('Fill the county name selector pop-up')
  cy.get(selectors.txtCountyName).should("be.visible").type(countyName)
})

//click Continu In CountrySelectorPopup
Cypress.Commands.add('clickContinuInCountrySelectorPopup',()=>{
    //cy.clickonLink('Continue')
    cy.contains('a.red-btn','Continue').click()
    //cy.get(selectors.dialogCountryPopup).should("not.be.visible")
  })