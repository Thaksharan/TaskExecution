///<reference types="Cypress"/>
import ProductPage from '../../PageObjects/ProductPage.js';
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const productpage = new ProductPage()
    const shoppingcartpage=new ShoppingCartPage();

    beforeEach(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-12.1 [LoggedOut][Login] [Top bar search ] -  Verify the product data able to search by Vendor Name/Brand', () => {

        cy.section('Logout-search brand name')

        cy.section('test data 1')
        cy.searchFromSearchBar('blum');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('blum')

        cy.section('test data 2')
        cy.searchFromSearchBar('grass');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('grass')

        cy.section('test data 3')
        cy.searchFromSearchBar('amerock');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('amerock')

        // cy.section('search brand name by partial value')
        // cy.searchFromSearchBar('wurt');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('Würth')

        cy.section('Logout-search product name with brand')

        cy.section('test data 1')
        cy.searchFromSearchBar('blum 120 degree hinge');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('blum')
        cy.verifySearchResultsNameHasKey('hinge')

        cy.section('test data 2')
        cy.searchFromSearchBar('ives hook');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('ives')
        cy.verifySearchResultsNameHasKey('hook')

        cy.section('test data 3')
        cy.searchFromSearchBar('pro t bar pull');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('pro')
        cy.verifySearchResultsNameHasKey('t bar pull')

        // cy.section('Logout-search product name with brand')

        // cy.section('test data 1')
        // cy.searchFromSearchBar('Ives Hook');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('Ives')
        // cy.verifySearchResultsNameHasKey('hook')

        // cy.section('test data 2')
        // cy.searchFromSearchBar('blum 120 degree hinge');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('blum')
        // cy.verifySearchResultsNameHasKey('hinge')

        // cy.section('test data 3')
        // cy.searchFromSearchBar('pro t bar pull');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('pro')
        // cy.verifySearchResultsNameHasKey('t bar pull')

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.section('Login-search brand name')

        cy.section('test data 1')
        cy.searchFromSearchBar('909 SURFACES');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('909 SURFACES')
        
        cy.section('test data 2')
        cy.searchFromSearchBar('DOLLKEN WOODTAPE');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('DOLLKEN WOODTAPE')

        cy.section('test data 3')
        cy.searchFromSearchBar('PRINCETON CHEMICAL');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('PRINCETON CHEMICAL')


        // cy.section('Login-search brand name by partial value') //NOT VALID
        // cy.searchFromSearchBar('ive');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('ives')

        // cy.section('Login-search brand name by partial value')  //NOT VALID

        // cy.section('test data 1')
        // cy.searchFromSearchBar('chemcraf');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('chemcraft')

        // cy.section('test data 2')
        // cy.searchFromSearchBar('us futab');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('us futaba')

        // cy.section('test data 3')
        // cy.searchFromSearchBar('sugatsun');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('sugatsun')

        cy.section('Login-search product name with brand')

        cy.section('test data 1')
        cy.searchFromSearchBar('Ives Hook');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('Ives')
        cy.verifySearchResultsNameHasKey('hook')

        cy.section('test data 2')
        cy.searchFromSearchBar('blum 120 degree hinge');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('blum')
        cy.verifySearchResultsNameHasKey('hinge')

        cy.section('test data 3')
        cy.searchFromSearchBar('pro t bar pull');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('pro')
        cy.verifySearchResultsNameHasKey('t bar pull')

    })

    it('WLC-TC-12.2 [Login] [Add to cart popup search] - Verify the product data able to search by Vendor Name/Brand', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.section('search brand name')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 3')
        cy.searchFromAddtoCartSearchBar('amerock');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('amerock')

        // cy.section('Search brand name by partial value')   //NOT VALID

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 1')
        // cy.searchFromAddtoCartSearchBar('chemcraf');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('chemcraft')
 
        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 2')
        // cy.searchFromAddtoCartSearchBar('us futab');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('us futaba')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 3')
        // cy.searchFromAddtoCartSearchBar('sugatsun');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('sugatsun')

        //productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('search brand name by partial value')
        // cy.searchFromAddtoCartSearchBar('wurt');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('Würth')

        cy.section('search product name with brand')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('grass dynapro');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('grass')
        cy.verifySearchResultsNameHasKey('dynapro')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 2')
        // cy.searchFromAddtoCartSearchBar('Ives Hook');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('Ives')
        // cy.verifySearchResultsNameHasKey('hook')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 3')
        // cy.searchFromAddtoCartSearchBar('pro t bar pull');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsBrandHasKey('pro')
        // cy.verifySearchResultsNameHasKey('t bar pull')
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


