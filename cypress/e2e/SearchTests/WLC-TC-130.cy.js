import HomePage from '../../PageObjects/HomePage.js';

describe('Search Tests', () => {
    const homepage = new HomePage();

    //Access data through hooks for multiple it blocks
    let alias_data
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/alias.json').then((data)=>{
        alias_data=data
      })
    })

    beforeEach(() => {
        cy.visit('/');
        cy.login();
        cy.setAccountShippingAddress();
        cy.verifySiteLoaded();
        cy.clickQuickOrder()
    });

    it('WLC-TC-130 [Login][Search By "Alias"]Verify search by alias using Quick cart', () => {
        
        cy.step('Type Alias name and click enter');
        cy.enterItemInQuickOrderDialog(1, alias_data.alias_name);
        
         //item sku for alias PSS537-613, is AB10010
        cy.step("click SKU from Suggestion List Quick Order");
        cy.clickSKUfromSuggestionListQuickOrderPad(alias_data.product_of_alias_variation_id)

        cy.step('verify Item SKU Large Quick Order')
        cy.verifyItemSKUOnQuickOrder(1,alias_data.product_of_alias_variation_id);

    });
});
