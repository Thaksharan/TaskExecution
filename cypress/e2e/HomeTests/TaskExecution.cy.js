///<reference types="Cypress"/>
import HomePage from "../../PageObjects/HomePage";
import selectors from '../../support/selectors.js';

describe('Home Tests', () => {
    const homepage = new HomePage();

    beforeEach(() => {
        cy.visit('/')
        cy.login();
        cy.verifySiteLoaded()
    })
    
    it('WLC-TC-387 Verify Home Page', () => {

        cy.step('verify user name')
        
        
    })

})


