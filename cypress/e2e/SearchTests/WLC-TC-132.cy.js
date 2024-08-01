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

    it.skip('WLC-TC-132 [LoggedOut] [Top bar search ] - Check accessibility of product page from Native search when user logged out', () => {

        cy.section('search Manufacturer Part number of a product')
        cy.searchFromSearchBar('SS18-BD200');
        productpage.verifyProductName('250ml Premium Solid Surface Adhesive Dispensing Gun')

        cy.section('search Manufacturer Part number of a product partially')
        cy.searchFromSearchBar('SDS-C301');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        //product related to partaial value
        cy.verifySearchResultsNameHasKey('Soft-Down Lid Stay')

        cy.section('search invalid Manufacturer Part number ')
        cy.searchFromSearchBar('9011bbb');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");

    })

})


