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

    it('WLC-TC-1126.1 [LoggedOut][Login] [Top bar search ] - Verify the search results with or without UOM in a search query ', () => {

        /*cy.section('Type without UOM in a search query and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('15 drawer slide');
        cy.verifySearchResultsSuggestionListHasKey('15')
        cy.verifySearchResultsSuggestionListHasKey('drawer slide')

        cy.section('test data 3')
        cy.enterTextInSearchBar('Clip Top 110 hinge');
        cy.verifySearchResultsSuggestionListHasKey('Clip Top 110°')
        cy.verifySearchResultsSuggestionListHasKey('hinge')*/

        /*cy.section('test data 2')
        cy.enterTextInSearchBar('110 deg hinge 45');
        cy.verifySearchResultsSuggestionListHasKey('110°')
        cy.verifySearchResultsSuggestionListHasKey('hinge')
        cy.verifySearchResultsSuggestionListHasKey('45mm')*/

        cy.section('Type without UOM in a search query and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('5/8 compact hinge');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('5/8"')
        cy.verifySearchResultsNameHasKey('compact hinge')

        cy.section('test data 2')
        cy.searchFromSearchBar('35 x 57 Dowel Boring Bit , 10 shank');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('35mm x 57mm Dowel Boring Bit')
        cy.verifySearchResultsNameHasKey('10mm shank')

        cy.section('test data 3')
        cy.searchFromSearchBar('9/16 Cover Cap');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('9/16" Cover Cap')

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type without UOM in a search query and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('3/4 overlay hinge ');
        cy.verifySearchResultsSuggestionListHasKey('3/4" overlay')
        cy.verifySearchResultsSuggestionListHasKey('hinge')

        cy.section('test data 2')
        cy.enterTextInSearchBar('16 Single Soft Closing 15 - 20 Door Thickness');
        cy.verifySearchResultsSuggestionListHasKey('16"')
        cy.verifySearchResultsSuggestionListHasKey('Single Soft-Closing')
        cy.verifySearchResultsSuggestionListHasKey('15mm - 20mm Door Thickness')*/

        /*cy.section('test data 3')
        cy.enterTextInSearchBar('Clip Top 95');
        cy.verifySearchResultsSuggestionListHasKey('Clip Top 95°')*/

        cy.section('Type without UOM in a search query and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('Blum full overlay soft closing 45');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('full overlay')
        cy.verifySearchResultsNameHasKey('soft-closing')
        cy.verifySearchResultsNameHasKey('45mm')

        cy.section('test data 2')
        cy.searchFromSearchBar('100 cap drawer slide');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('100lb capacity')
        cy.verifySearchResultsNameHasKey('drawer slide')

        cy.section('test data 3')
        cy.searchFromSearchBar('5/8 x 6 flat head screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('5/8" x 6 flat head')
        cy.verifySearchResultsNameHasKey('screw')
    })

    it('WLC-TC-1126.2 [Login] [Add to cart popup search] - Verify the search results with or without UOM in a search query', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Type without UOM in a search query and check the results page')
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('1-3/8 Mod Curved Knob');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('1-3/8" Mod Curved Knob')

        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 2')
        cy.searchFromAddtoCartSearchBar('120 opening hinge 45');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('120°')
        cy.verifySearchResultsNameHasKey('opening hinge')
        cy.verifySearchResultsNameHasKey('45mm')*/
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

    
})


