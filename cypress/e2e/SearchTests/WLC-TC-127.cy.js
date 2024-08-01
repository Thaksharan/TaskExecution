import selectors from '../../support/selectors.js';
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage.js";

describe('Search Tests', () => {
    //const shoppingcartpagepage = new ShoppingCartPagePage();

     //Access data through hooks for multiple it blocks
     let alias_data
     before(()=>{
       cy.fixture(Cypress.env("fixtureFolder") +'/alias.json').then((data)=>{
         alias_data=data
       })
     })

    beforeEach(() => {
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

    })

    it('WLC-TC-127 [Login] [Search By "Alias"] - Verify search by alias using Quick order pad', () => {

      //previous alias-PSS537-613,product related 1" Chip Brush,selecteddropdown-AB10010,maufac no-WV10
        cy.step('Search alias in Top Bar Search')
        cy.clickQuickOrder()

        cy.step('quick order dialog is visible')
        cy.verifyQuickOrderDialogDisplayed()

        cy.step('Enter an alias')
        cy.enterItemInQuickOrderDialog('1',alias_data.alias_name)
        cy.clickSearchSuggestionQuickOrder(alias_data.product_of_alias)

        cy.enterItemQuantityInQuickOrderDialog('1','1')

        cy.step('click validate button')
        cy.clickValidateBtnOnQuickOrder()

    })

})