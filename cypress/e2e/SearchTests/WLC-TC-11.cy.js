///<reference types="Cypress"/>
import HomePage from '../../PageObjects/HomePage.js';
import ProductPage from '../../PageObjects/ProductPage.js';
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const homepage = new HomePage();
    const productpage = new ProductPage()
    const shoppingcartpage=new ShoppingCartPage();

    beforeEach(() => {
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

    })

    it('WLC-TC-11.1 [Login] [Top bar search ] - Verify the product data able to search by Attributes', () => {

        cy.section('search product attribute value')
        cy.searchFromSearchBar('Zinc Die-Cast');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Zinc Die-Cast')

        cy.section('search product attribute value by partial value')
        cy.searchFromSearchBar('Zinc Die');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Zinc Die-Cast')

    })

    it('WLC-TC-11.2 [Login] [Add to cart popup search] - Verify the product data able to search by Attributes', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search product attribute value')
        cy.searchFromAddtoCartSearchBar('Zinc Die-Cast');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Zinc Die-Cast')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search product attribute value by partial value')
        cy.searchFromAddtoCartSearchBar('Zinc Die');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Zinc Die-Cast')
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


