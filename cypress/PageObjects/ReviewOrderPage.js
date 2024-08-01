import selectors from '../support/selectors.js';

class ReviewOrderPage{

//Following details should be displayed

// * User Selected Payment method
verifyPaymentMethod(paymentMethod){
    cy.contains('div.info-box','Payment Method').should('include.text',paymentMethod)
}

// * User selected Shipping Address
verifyShippingAddress(shippingAddress){
    cy.contains('div.info-box','Shipping Address').should('include.text',shippingAddress)
}

// * The billing address
verifyBillingAddress(billingAddress){
    cy.contains('div.info-box','Billing Address').should('include.text',billingAddress)
}

// * User provided PO no / Job name
verifyPoNumber(poNo){
    cy.contains('p','PO No:').should('include.text',poNo)
}

verifyJobName(jobName){
    cy.contains('p','Job Name:').should('include.text',jobName)
}

// * Future ship date

// * Order confirmation email address
verifyOrderConfirmationEmail(email){
    cy.contains('div.info-box','Order Confirmation Email').should('include.text',email)
}

// * Ordered products with correct Quantities, selected payment method
verifyProductName(itemCode){
    cy.contains('.item__link a','Item#: ').should('include.text',itemCode)
}

verifyProductQuantity(quantity){
    cy.get('.qty-field span').should('have.text',quantity)
}

// * Product Availability

// * Order Summary (Total, Shipping)
verifyOrderSummary(){
    cy.contains('div','Order Summary').should('be.visible')
    cy.get('.summary-info').should('be.visible')
    cy.get('.summary-row.items-price').should('be.visible')
    cy.get('.summary-row.shopping').should('be.visible')
    cy.get('.summary-row.sub-total').should('be.visible')
    cy.get('.summary-row.total').should('be.visible')
     

}


//checkout btn
verifyCheckoutButton(){
    cy.get('[title="CHECKOUT"]').should('be.visible')
}

getShippingMethodOfItem(){
    // cy.get('.ship-details').eq(0).invoke('text')
    //   .then(text => text.split('|')[0])   // 1st part of split
    //   .then(parseInt)
    //   .should('eq', pageNo)
    let shippingMethod
    cy.get('.ship-details').eq(0).invoke('text')
      .then((text)=>{
         shippingMethod=text.split('|')[2]
       // let shiplocation=firstpart.split('from ')[1]
        cy.log(shippingMethod)
      })
      return shippingMethod
}

verifyShippingMethodIsSameAsCart(cartPageValue,reviewPageValue){
    expect(reviewPageValue).to.equal(cartPageValue);
}

}

export default ReviewOrderPage;