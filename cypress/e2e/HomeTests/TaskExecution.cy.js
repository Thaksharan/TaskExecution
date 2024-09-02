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
    
    it('Practical Task', () => {

        cy.step('Go inside a Product Page and Add to Cart')
        homepage.addingProductToCart()
        homepage.verifyShippingAddressSection()
        homepage.verifyPaymentSection()
        
    })

})
