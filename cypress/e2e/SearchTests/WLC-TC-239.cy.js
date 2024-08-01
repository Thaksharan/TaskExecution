///<reference types="Cypress"/>
import ProductPage from "../../PageObjects/ProductPage";
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const productpage = new ProductPage()

    before(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

    })

    it.skip('WLC-TC-239 [LoggedOut] [Search] - Verify the cloud search option', () => {

        cy.step('Enter a search keyword')
        cy.enterTextInSearchBar('chemcraft');

        cy.step('able to see the order of the display as follows')
        cy.verifyListHeadingsDisplayOnSearchSuggestion()

        cy.step('click on Brand logo under brands on search suggestion')
        cy.clickBrandBlock()
        //cy.wait(8000)
        cy.verifySearchResultsIsLoaded()
        cy.step('verify Brand Native Search Results Page Loaded')
        cy.verifyBrandNativeSearchResultsPage('chemcraft')

        cy.step('Enter a search keyword')
        cy.enterTextInSearchBar('Knobs');

        cy.step('click on product under products on search suggestion')
        cy.clickProductSuggested(0)
        cy.step('verify Product Page Loaded')
        productpage.verifyProductNameLabelVisible()

        // cy.step('Click on a search results product view item button')
        // productpage.clickViewItemButtonOnSearchResults(1)
        // productpage.verifyProductNameLabelVisible()
    })

})


