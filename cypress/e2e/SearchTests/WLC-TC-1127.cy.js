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

    it('WLC-TC-1127.1 [LoggedOut][Login] [Top bar search ] - Letters and numbers together should be searchable with or without space', () => {

        /*cy.section('Type a letter and numbers together with & without a space and check in the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('RW20');
        cy.verifySearchResultsSuggestionListHasKey('RW20')
        cy.enterTextInSearchBar('RW 20');
        cy.verifySearchResultsSuggestionListHasKey('RW20')

        cy.section('test data 2')
        cy.enterTextInSearchBar('pro100 drawer slide');
        cy.verifySearchResultsSuggestionListHasKey('pro100')
        cy.verifySearchResultsSuggestionListHasKey('drawer slide')
        cy.enterTextInSearchBar('pro 100 drawer slide');
        cy.verifySearchResultsSuggestionListHasKey('pro100')
        cy.verifySearchResultsSuggestionListHasKey('drawer slide')*/

        cy.section('Type a letter and numbers together with & without a space and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('pro600');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('pro600')
        cy.searchFromSearchBar('pro 600');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('pro600')

        cy.section('test data 2')
        cy.searchFromSearchBar('pro600 slides');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('pro600')
        cy.verifySearchResultsNameHasKey('slide')
        cy.searchFromSearchBar('pro 600 slides');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('pro600')
        cy.verifySearchResultsNameHasKey('slide')

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type a letter and numbers together with & without a space and check in the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('8450fm');
        cy.verifySearchResultsSuggestionListHasKey('8450fm')
        cy.enterTextInSearchBar('8450 fm');
        cy.verifySearchResultsSuggestionListHasKey('8450fm')

        cy.section('test data 2')
        cy.enterTextInSearchBar('290CFM');
        cy.verifySearchResultsSuggestionListHasKey('290 CFM')
        cy.enterTextInSearchBar('290 CFM');
        cy.verifySearchResultsSuggestionListHasKey('290 CFM')*/

        cy.section('Type a letter and numbers together with & without a space and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('GS4270');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('GS4270')
        cy.searchFromSearchBar('GS 4270');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('GS4270')

        cy.section('test data 2')
        cy.searchFromSearchBar('EB19');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('EB19')
        cy.searchFromSearchBar('EB 19');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('EB19')


    })

    it('WLC-TC-1127.2 [Login] [Add to cart popup search] - Letters and numbers together should be searchable with or without space', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Type a letter and numbers together without a space and check the results page')
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('34HD');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('34HD')
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })
    

    
})