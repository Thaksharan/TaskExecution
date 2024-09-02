import selectors from '../support/selectors.js';

class HomePage {
    addingProductToCart(){
        cy.get(selectors.productinHomePage).click()
        cy.get(selectors.addToCartBtn).click()
        cy.get(selectors.addedToCartPopup).should('be.visible')
        cy.get(selectors.addedToCartCloseBtn).click()
        cy.get(selectors.goToCartBtn).click()
        cy.get(selectors.productID).contains('KA-ST-GH138').should('be.visible');
    }

    verifyShippingAddressSection(){
        cy.get(selectors.placeOrderBtn).click()
        cy.get('h3[data-singer-selector="edit-checkout-header-title-heading"]').should('be.visible')
        cy.get(selectors.checkoutPageNICField).type('123456789V')
        cy.get('#edit-actions-next').click()
        cy.wait(1000)
    }
    
    verifyPaymentSection(){    
        cy.get('h3').contains('Make Payment').should('be.visible')
        cy.get(selectors.paymentOptions).children('div').should('have.length', 3)
        cy.get(selectors.paymentOptions).children('div').eq(0).click()
        cy.get('#edit-payment-method--3Q0Ycd7vBWM--wrapper').should('be.visible')
        cy.get(selectors.paymentOptions).children('div').eq(1).click()
        cy.get('#edit-payment-method--k6AYNZ2R1M8--wrapper').should('be.visible')
        cy.get(selectors.paymentOptions).children('div').eq(2).should('be.visible')
    }
}

export default HomePage;