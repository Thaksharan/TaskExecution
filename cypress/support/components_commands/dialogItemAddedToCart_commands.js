/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "../selectors.js";

//custom command to verifylabels on popup
Cypress.Commands.add('verifyItemAddedToCartPopup', () => {
  cy.verifyLabel('th','Product Description');
  cy.verifyLabel('th','Unit Price');
  cy.verifyLabel('th','Quantity');
  cy.verifyLabel('th','Sub Total');
  
  })

//custom command to verifyViewCartPopup
Cypress.Commands.add('verifyViewCartOnPopup', () => {
  cy.get(selectors.btnViewCart).should((btn)=>{
    expect(btn).to.be.visible
  })
  cy.get('[title="Continue Shopping"]').should('be.visible')
  
  })

//custom command to clickViewCartOnPopup
Cypress.Commands.add('clickViewCartOnPopup', () => {
    cy.get(selectors.btnViewCart).click();
  })

  //custom command to verifyItemIdOnPopup
Cypress.Commands.add('verifyItemIdOnPopup', (item_id) => {
  cy.verifyLabel('.product-des-list .item-code',item_id);
  
  })

//custom command to verifyItemQuantityOnPopup
Cypress.Commands.add('verifyItemQuantityOnPopup', (qty) => {
  cy.verifyLabel('td',`${qty} Each`);;
  
  })

//custom command to click continue shopping
Cypress.Commands.add('clickContinueShoppingOnPopup', () => {
  cy.get('[title="Continue Shopping"]').click();
})

Cypress.Commands.add('getShippingMethodOfItemOnCartPopup',()=>{
  let shippingMethod
    cy.get('.ship-details').eq(0).invoke('text')
      .then((text)=>{
         shippingMethod=text.split('|')[2]
       // let shiplocation=firstpart.split('from ')[1]
        cy.log("shipping Method:" + shippingMethod)
      })
})

Cypress.Commands.add('getStockStatusOnCartPopup',()=>{
 // let stockStatus
    cy.get('.product-stock-details span').eq(0).invoke('text')
      .then((stockStatus)=>{
        //stockStatus=text.split('|')[2]
       // let shiplocation=firstpart.split('from ')[1]
        cy.log("stock status: " + stockStatus)
      })
})

Cypress.Commands.add('clickCloseBtnOnCartPopup', () => {
  cy.get('button.close').click({force:true});
})
