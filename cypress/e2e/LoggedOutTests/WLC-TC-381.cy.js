///<reference types="Cypress"/>
//import selectors from '../../support/selectors.js';

describe('Logged Out Tests', () => {

    before(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
       
    })
    
    it('WLC-TC-381 [Logged Out] Verify the County Selector Popup', () => {
        //County selector popup should display to the user
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        //The County selector popup should close
        cy.clickContinuInCountrySelectorPopup()
       
        
    })

})


