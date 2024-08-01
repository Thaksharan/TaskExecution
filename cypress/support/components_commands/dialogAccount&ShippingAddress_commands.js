/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "../selectors.js";

//Choose your account and shipping address
Cypress.Commands.add('setAccountShippingAddress',()=>{
  cy.fixture(Cypress.env("fixtureFolder") +'/shipping_data.json').then((shippingData)=>{
    cy.step('set Account Shipping Address')
    //cy.clickOnFirstRadio();
    //cy.get('label.custom-radio').contains('999999').click()
    cy.get(`.list-group-item input[value="${shippingData.account_shipping_number}"]`).eq(0).check()
    //cy.clickOnRadio();
    cy.get(`.sub-list input[value="${shippingData.account_shipping_number}"]`).check()
    //cy.verifyButtonText("Continue")
    cy.clickContinueButton().wait(500)
  })
    
  })

//check Remember MySetting
Cypress.Commands.add('checkRememberMySetting',()=>{
  cy.waitForStableDOM()
  cy.xpath(selectors.chkRememberMySetting,{timeout:10000}).check( {force: true}).should('be.checked')

})

//check Remember MySetting
Cypress.Commands.add('uncheckRememberMySetting',()=>{
  cy.waitForStableDOM()
  cy.xpath(selectors.chkRememberMySetting,{timeout:10000}).uncheck( {force: true}).should('not.be.checked')

})

//verify Remember MySetting Checked
Cypress.Commands.add('verifyRememberMySettingChecked',()=>{
  cy.xpath(selectors.chkRememberMySetting).should('be.checked')
})

//verify AccountShippingAddresspopup  Displayed
Cypress.Commands.add('verifyAccountShippingAddressDisplayed',()=>{
  cy.contains('.modal-header','Account & Shipping Address').should('exist');
})

//verify AccountShippingAddresspopup  Not Displayed
Cypress.Commands.add('verifyAccountShippingAddressNotDisplayed',()=>{
  cy.contains('.modal-header','Account & Shipping Address').should('not.exist');
})

Cypress.Commands.add('clickContinueButton',()=>{
  //cy.contains('button',"Continue").click({force:true})
  cy.get('.modal-body').find("[title='Continue']").eq(0).as('continueBtn')
  cy.get('@continueBtn').click()
  cy.on('uncaught:exception', (err, runnable) => {
    return false
  })
})

Cypress.Commands.add('clickCloseButton',()=>{
  cy.ButtonClick(selectors.btnCloseAddressIcon);
})
