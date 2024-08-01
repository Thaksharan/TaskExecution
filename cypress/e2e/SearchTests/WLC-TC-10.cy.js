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

    it('WLC-TC-10.1 [Login] [Top bar search ] - Verify the product data able to search by Category', () => {

        //to do
        cy.section('search a Category')
        cy.searchFromSearchBar('Adhesives, Caulking & Sealants');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Adhesive')

        cy.section('search a Category')
        cy.searchFromSearchBar('drawer slides & systems');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Drawer Slide')

        cy.section('search a Category')
        cy.searchFromSearchBar('knobs & pulls');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Knob & Pull')

        cy.section('search a Sub-category')
        cy.searchFromSearchBar('Belts');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Belt')

        cy.section('search a Sub-category')
        cy.searchFromSearchBar('replacement bulbs');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Replacement Bulb')

        cy.section('search a Sub-category')
        cy.searchFromSearchBar('bread drawers');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Bread Drawer')

        cy.section('search a Sub-category')
        cy.searchFromSearchBar('edge sanding tools');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Edge Sanding')

        cy.section('search a part of Category/Sub-category')
        cy.searchFromSearchBar('bar pu');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Bar Pull')

        cy.section('search a part of Category/Sub-category')
        cy.searchFromSearchBar('drawer slid');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Drawer Slide')

        cy.section('search a part of Category/Sub-category')
        cy.searchFromSearchBar('towel bar');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Towel Bar')

    })

    it('WLC-TC-10.2 [Login] [Add to cart popup search] - Verify the product data able to search by Category', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search a Category')
        cy.searchFromAddtoCartSearchBar('Adhesives, Caulking & Sealants');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Adhesive')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a Category')
        cy.searchFromAddtoCartSearchBar('drawer slides & systems');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Drawer Slide')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a Category')
        cy.searchFromAddtoCartSearchBar('knobs & pulls');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Knob & Pull')


        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a Sub-category')
        cy.searchFromAddtoCartSearchBar('Belts');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Belt')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a Sub-category')
        cy.searchFromAddtoCartSearchBar('replacement bulbs');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Replacement Bulb')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a Sub-category')
        cy.searchFromAddtoCartSearchBar('bread drawers');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Bread Drawer')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a Sub-category')
        cy.searchFromAddtoCartSearchBar('edge sanding tools');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Edge Sanding')


        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a part of Category/Sub-category')
        cy.searchFromAddtoCartSearchBar('bar pu');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Bar Pull')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a part of Category/Sub-category')
        cy.searchFromAddtoCartSearchBar('drawer slid');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Drawer Slide')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('search a part of Category/Sub-category')
        cy.searchFromAddtoCartSearchBar('towel bar');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Towel Bar')
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


