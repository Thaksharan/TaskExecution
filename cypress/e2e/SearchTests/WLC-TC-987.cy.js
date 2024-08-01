///<reference types="Cypress"/>
import ProductPage from "../../PageObjects/ProductPage";
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

    it.skip('Not Valid : WLC-TC-987 [LoggedOut][Top bar search ] - Verify the items that do not have group/ category when they are searched on the web', () => {

        cy.section('search an item which does not have a category')
        cy.searchFromSearchBar('L-CWJ48123S-1Q');
        productpage.verifySomethingWentWrongError()
     

        cy.section('search an item which does not have a group')
        cy.searchFromSearchBar('PCBNS18063');
        productpage.verifySomethingWentWrongError()
        

    })

})


