///<reference types="Cypress"/>
import ProductPage from '../../PageObjects/ProductPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const productpage = new ProductPage()

    beforeEach(() => {

        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-1125.1 [LoggedOut][Login] [Top bar search ] - Verify search results when same query is repeated', () => {

        /*cy.section('Type a repeated query the search bar and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('14mm x 14mm');
        cy.verifySearchResultsSuggestionListHasKey('14mm x 14mm')

        cy.section('test data 2')
        cy.enterTextInSearchBar('5" x 5"');
        cy.verifySearchResultsSuggestionListHasKey('5" x 5" ')*/

        /*cy.section('test data 3')
        cy.enterTextInSearchBar('120*120 ');
        cy.verifySearchResultsSuggestionListHasKey('120mm x 120mm')*/

        cy.section('Search a repeated query and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('12mm x 12mm');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('12mm x 12mm')

        cy.section('test data 2')
        cy.searchFromSearchBar('2" * 2"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('2" x 2"')

        cy.section('test data 3')
        cy.searchFromSearchBar('15-1/4" x 15-1/4"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('15-1/4" x 15-1/4"')

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type a repeated query in the search bar and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('12 x 12');
        cy.verifySearchResultsSuggestionListHasKey('12 x 12')

        cy.section('test data 3')
        cy.enterTextInSearchBar('1-1/4"x1-1/4"');
        cy.verifySearchResultsSuggestionListHasKey('1-1/4" x 1-1/4"')*/

        /*cy.section('test data 2')
        cy.enterTextInSearchBar('1" x 1"');
        cy.verifySearchResultsSuggestionListHasKey('1" x 1"')*/

        cy.section('Search a repeated query and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('20" x 20"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('20" x 20"')

        cy.section('test data 2')
        cy.searchFromSearchBar('5" * 5"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('5" x 5" ')

        cy.section('test data 3')
        cy.searchFromSearchBar('18mmx18mm');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('18mm x18mm')
    })

    it('WLC-TC-1125.2 [Login] [Add to cart popup search] - Verify search results when same query is repeated', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Verify search results when same query is repeated')
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('14mmx14mm');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('14mm x 14mm')

        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 2')
        cy.searchFromAddtoCartSearchBar('2-1/4" x 2-1/4"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('2-1/4" x 2-1/4"')*/
    
    })

    
})


