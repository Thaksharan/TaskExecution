///<reference types="Cypress"/>
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const shoppingcartpage = new ShoppingCartPage();

    //Access data through hooks for multiple it blocks
    let alias_data
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/alias.json').then((data)=>{
        alias_data=data
      })
    })

    beforeEach(() => {
        cy.visit("/");
        cy.login();
        cy.setAccountShippingAddress();
        cy.verifySiteLoaded();

    })

    it('WLC-TC-128 [Login] [Search By "Alias"] - Verify search by alias using Large order pad', () => {

    cy.clickViewCartOnHeader();
    shoppingcartpage.verifyShoppingCartPageHeader();

    cy.step("click UseLargeOrder Button");
    shoppingcartpage.clickUseLargeOrderButton();
    cy.verifyLabel("h1", "Large Order Pad");

    cy.step("type alias name");
    shoppingcartpage.typeItemAliasLargeOrderPad(1,alias_data.alias_name);
    cy.wait(5000)

    //item sku for alias PSS537-613, is AB10010
    cy.step("click SKU from Suggestion List Large Order Pad");
    shoppingcartpage.clickSKUfromSuggestionListLargeOrderPad(alias_data.product_of_alias_variation_id)

    cy.step('verify Item SKU Large Order Pad')
    shoppingcartpage.verifyItemSKULargeOrderPad(1,alias_data.product_of_alias_variation_id)



    })

})


