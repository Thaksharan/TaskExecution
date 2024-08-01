///<reference types="Cypress"/>
import HomePage from '../../PageObjects/HomePage.js';
import ProductPage from '../../PageObjects/ProductPage.js';
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const homepage = new HomePage();
    const productpage = new ProductPage()
    const shoppingcartpage=new ShoppingCartPage()

    beforeEach(() => {
        cy.visit('/')
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-9.1 LoggedOut][Login] [Top bar search ] - Verify the product data able to search by Group/Product Title', () => {

        //Logged-out Search
        cy.section('search Group title of a product and check in Searched Result Page')

        cy.section('test data 1')
        cy.searchFromSearchBar('Dynapro 3D Right Front Locking Device No Flange');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Dynapro 3D Right Front Locking Device No Flange')

        cy.section('test data 2')
        cy.searchFromSearchBar('8mm Dowel and Screw for Hinge');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('8mm Dowel and Screw for Hinge')

        cy.section('search Product title of a product and check in Searched Result Page')

        cy.section('test data 1')
        cy.searchFromSearchBar('Dynapro Left/Right Adjustable Rear Adaptor for 3-D Slides');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('Dynapro Left/Right Adjustable Rear Adaptor for 3-D Slides')

        cy.section('search Group/Product title of a product by partial value and check in Searched Result Page')
        //Minimum first 3 letters should be entered

        cy.section('test data 1')
        cy.searchFromSearchBar('Infinity Bond Flex 50 PUR');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Infinity Bond Flex 50 PUR Corded & Cordless Hot Melt Applicator with Plastic Stand')
    

        //Login- Search
        //to do
        cy.section('search Group title of a product and check in Searched Result Page')

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.section('test data 1')
        cy.searchFromSearchBar('SeamFil Laminate Repair 1 oz Tube');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('SeamFil Laminate Repair 1 oz Tube')

        cy.section('test data 2')
        cy.searchFromSearchBar('Infinity Bond Flex 50 PUR Corded & Cordless Hot Melt Applicator,');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Infinity Bond Flex 50 PUR Corded & Cordless Hot Melt Applicator with Plastic Stand')

        cy.section('search Product title of a product and check in Searched Result Page')

        cy.section('test data 1')
        cy.searchFromSearchBar('SeamFil Laminate Repair 1 oz Tube, White');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('SeamFil Laminate Repair 1 oz Tube, White')

        cy.section('test data 2')
        cy.searchFromSearchBar('Infinity Bond Flex 50 PUR Corded & Cordless Hot Melt Applicator with Plastic Stand');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('Infinity Bond Flex 50 PUR Corded & Cordless Hot Melt Applicator with Plastic Stand')

        cy.section('search Group/Product title of a product by partial value and check in Searched Result Page')
        //Minimum first 3 letters should be entered

        cy.section('test data 1')
        cy.searchFromSearchBar('SeamFil');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('SeamFil Laminate Repair 1 oz Tube')

        cy.section('test data 2')
        cy.searchFromSearchBar('Infinity Bond Flex 50 PUR');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Infinity Bond Flex 50 PUR Corded & Cordless Hot Melt Applicator with Plastic Stand')

    })

    it('WLC-TC-9.2 [Login] [Add to cart popup search] - Verify the product data able to search by Group/Product Title', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.section('Search Group title of a product and check in Searched Result Page')
        
        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('SeamFil Laminate Repair 1 oz Tube');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('SeamFil Laminate Repair 1 oz Tube')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 2')
        cy.searchFromAddtoCartSearchBar('Infinity Bond Flex 50 PUR Corded & Cordless Hot Melt Applicator,');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Infinity Bond Flex 50 PUR Corded & Cordless Hot Melt Applicator with Plastic Stand')

        cy.section('search Product title of a product and check in Searched Result Page')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 2')
        cy.searchFromAddtoCartSearchBar('SeamFil Laminate Repair 1 oz Tube, White');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('SeamFil Laminate Repair 1 oz Tube, White')

        cy.section('search Group/Product title of a product by partial value')
        //Minimum first 3 letters should be entered
        
        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('SeamFil');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('SeamFil Laminate Repair 1 oz Tube')

    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })


})


