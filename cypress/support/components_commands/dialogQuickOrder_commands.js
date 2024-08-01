/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "../selectors.js"

//custom command to enterItemInQuickOrderDialog
Cypress.Commands.add('enterItemInQuickOrderDialog', (itemRowNum,itemcode) => {
    cy.xpath(`//div[h2[contains(.,"Quick Order")]]/following::div[1]//tbody/tr[${itemRowNum}]/td[2]/div[1]/input[1]`)
      .type(itemcode)

    // cy.get('.modal-body div .quick-order-table tbody').then(($el) => {
    //     if ($el.find(selectors.quickOrderSku1).length) {
    //     // Element exists, do something
    //         cy.enterValue(selectors.quickOrderSku1,'SE901')
    //         cy.wait(2000)
    //     } 
  })

  Cypress.Commands.add('verifyItemSKUOnQuickOrder',(itemRowNum, expectedValue)=>{
    const selector = `//div[h2[contains(.,"Quick Order")]]/following::div[1]//tbody/tr[${itemRowNum}]/td[2]/div[1]/input[1]`;
    cy.xpath(selector).should('have.value', expectedValue);
  })

  Cypress.Commands.add('clickSKUfromSuggestionListQuickOrderPad',(sku)=>{
    //verify only 1 suggestion displayed
    //cy.wait(8000)
   // cy.get('a[data-tip="true"]').should('have.length','1')
    //verify correct suggestion displayed
    cy.get(`[data-for='${sku}']`).as('suggestion').should('be.visible')
    cy.get('@suggestion').click()
  })

Cypress.Commands.add('enterItemQuantityInQuickOrderDialog', (itemRowNum,itemQuantity) => {
    cy.xpath(`//div[h2[contains(.,"Quick Order")]]/following::div[1]//tbody/tr[${itemRowNum}]/td[4]/input[1]`)
      .type(itemQuantity)
  })

  Cypress.Commands.add('verifyItemQuantityInQuickOrderDialog',(itemRowNum, expectedValue)=>{
    const selector = `//div[h2[contains(.,"Quick Order")]]/following::div[1]//tbody/tr[${itemRowNum}]/td[4]/input[1]`;
    cy.xpath(selector).should('have.value', expectedValue);
  })

Cypress.Commands.add('clickValidateBtnOnQuickOrder',()=>{
  //cy.wait(10000)
  //cy.waitForStableDOM();
    //cy.clickOnButtonByXpath(selectors.validateButton);
    cy.xpath(selectors.validateButton).scrollIntoView().click();
})

Cypress.Commands.add('verifyAddToCartBtnOnQuickOrder',()=>{
  cy.xpath(selectors.AddToCartBtn).should((btn)=>{
    expect(btn).to.be.visible
  })
  cy.VerifyButtonTextValue(selectors.AddToCartBtn,' Add to cart')
})

Cypress.Commands.add('clickAddToCartBtnOnQuickOrder',()=>{
    cy.clickOnButtonByXpath(selectors.AddToCartBtn).wait(5000)
})

Cypress.Commands.add('verifyQuickOrderDialogDisplayed',()=>{
  cy.get('.fade.modal.show').should("be.visible")
})

Cypress.Commands.add('clickSearchSuggestionQuickOrder',(searchText)=>{
  cy.waitForStableDOM()
 // cy.clickElementByText(selectors.searchBarSuggestionQuickOrder,searchText);
  cy.contains(selectors.searchBarSuggestionQuickOrder,searchText).click()
})
