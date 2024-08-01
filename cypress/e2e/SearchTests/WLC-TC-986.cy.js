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

    it('WLC-TC-986.1 [LoggedOut][Login] [Top bar search ] -  Verify search results with double quotes (inches)', () => {

        /*cy.section('Type a double qoute in the search bar and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('3-1/8"');
        cy.verifySearchResultsSuggestionListHasKey('3-1/8"')

        cy.section('test data 2')
        cy.enterTextInSearchBar('1 inch drywall screw');
        cy.verifySearchResultsSuggestionListHasKey('1"')
        cy.verifySearchResultsSuggestionListHasKey('drywall screw')

        cy.section('test data 3')
        cy.enterTextInSearchBar('1-5/8" x 8 flat head');
        cy.verifySearchResultsSuggestionListHasKey('1-5/8" x 8 flat head')*/

        cy.section('enter a search key includes " (double quotes that refer to inch/inches) in results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('1"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        //cy.verifySearchResultsNameHasKey('”')
        cy.verifySearchResultsNameHasKey('"')

        cy.section('test data 2')
        cy.searchFromSearchBar('12 inch tandem plus');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('12" tandem plus')

        cy.section('test data 3')
        cy.searchFromSearchBar('3-1/8"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('3-1/8"')

        cy.section('test data 4')
        cy.searchFromSearchBar('1 inch drywall screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('1"')
        cy.verifySearchResultsNameHasKey('drywall screw')

        /*cy.section('test data 5')
        cy.searchFromSearchBar('1-5/8" x 8  flat head');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('1-5/8" x 8 flat head')*/

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type a double qoute in the search bar and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('3-1/8"');
        cy.verifySearchResultsSuggestionListHasKey('3-1/8"')

        cy.section('test data 2')
        cy.enterTextInSearchBar('1 inch drywall screw');
        cy.verifySearchResultsSuggestionListHasKey('1"')
        cy.verifySearchResultsSuggestionListHasKey('drywall screw')

        cy.section('test data 3')
        cy.enterTextInSearchBar('1-5/8" x 8  flat head');
        cy.verifySearchResultsSuggestionListHasKey('1-5/8" x 8 flat head')*/

        cy.section('enter a search key includes " (double quotes that refer to inch/inches) in results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('2-3/8"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('2-3/8"')

        cy.section('test data 2')
        cy.searchFromSearchBar('inches');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('inch')

        cy.section('test data 3')
        cy.searchFromSearchBar('1 inch x 6 drywall screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('1" x 6')

        /*cy.section('test data 4')
        cy.searchFromSearchBar('1 inch drywall screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('1"')
        cy.verifySearchResultsNameHasKey('drywall screw')

        cy.section('test data 5')
        cy.searchFromSearchBar('1-5/8" x 8  flat head');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('1-5/8" x 8 flat head')*/

    })

    it('WLC-TC-986.2 [Login] [Add to cart popup search] - Verify search results with double quotes (inches)', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type a double qoute in the search bar and check the suggestion list')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 1')
        cy.enterTextAddtoCartSearchBar('3-1/8"');
        cy.verifyAddToCartPopupSearchResultsSuggestionListHasKey('3-1/8"')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 2')
        cy.enterTextAddtoCartSearchBar('1 inch drywall screw');
        cy.verifyAddToCartPopupSearchResultsSuggestionListHasKey('drywall screw')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 1')
        cy.enterTextAddtoCartSearchBar('1-5/8" x 8 flat head');
        cy.verifyAddToCartPopupSearchResultsSuggestionListHasKey('1-5/8" x 8 flat head')*/

        cy.section('enter a search key includes " (double quotes that refer to inch/inches) in results page')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('1-5/8" x 8 flat head');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('1-5/8" x 8 flat head')
        
        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 2')
        cy.searchFromAddtoCartSearchBar('1"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('"')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 3')
        cy.searchFromAddtoCartSearchBar('inch');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('inch')
        
        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 4')
        cy.searchFromAddtoCartSearchBar('3-1/8"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('3-1/8"')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 5')
        cy.searchFromAddtoCartSearchBar('1 inch drywall screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('1"')
        cy.verifySearchResultsNameHasKey('drywall screw')*/
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


