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

    it('WLC-TC-1118.1 [LoggedOut][Login] [Top bar search ] - Verify when a MFR Part Number is mapped to multiple items, should redirect to search page containing all the products that contain the same MFR Part Number.', () => {

        /*cy.section('Type a MFR Part Number that is mapped to multiple items and check in the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('Fastbreak');
        cy.verifySearchResultsSuggestionListHasKey('Fastbreak')

        cy.section('test data 1')
        cy.enterTextInSearchBar('tips');
        cy.verifySearchResultsSuggestionListHasKey('tip')*/

        cy.section('Type a MFR Part Number that is mapped to multiple items and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('Fastbreak');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Fastbreak')

        cy.section('test data 1')
        cy.searchFromSearchBar('tips');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('tip')

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type a MFR Part Number that is mapped to multiple items and check in the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('Fastbreak');
        cy.verifySearchResultsSuggestionListHasKey('Fastbreak')

        cy.section('test data 1')
        cy.enterTextInSearchBar('tips');
        cy.verifySearchResultsSuggestionListHasKey('tip')*/

        cy.section('Type a MFR Part Number that is mapped to multiple items and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('Fastbreak');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Fastbreak')

        cy.section('test data 1')
        cy.searchFromSearchBar('tips');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('tip')

    })

    it('WLC-TC-1118.2 [Login] [Add to cart popup search] - Verify when a MFR Part Number is mapped to multiple items, should redirect to search page containing all the products that contain the same MFR Part Number.', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Type a MFR Part Number that is mapped to multiple items and check the results page')
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('Fastbreak');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Fastbreak')
    
    })
    

    
})