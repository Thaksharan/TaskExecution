///<reference types="Cypress"/>
import ProductPage from '../../PageObjects/ProductPage.js';
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const productpage = new ProductPage()
    const shoppingcartpage=new ShoppingCartPage()

    beforeEach(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-989.1 [LoggedOut][Login] [Top bar search ] - Verify search results with synonyms', () => {

        /*cy.section('Type a synonym in the search bar and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('lasy susan');
        cy.verifySearchResultsSuggestionListHasKey('lazy susan')

        cy.section('test data 2')
        cy.enterTextInSearchBar('Fast cap');
        cy.verifySearchResultsSuggestionListHasKey('Fastcap')

        cy.section('test data 3')
        cy.enterTextInSearchBar('bull nose');//not working-ask nimesha
        cy.verifySearchResultsSuggestionListHasKey('Bullnose')

        cy.section('test data 4')
        cy.enterTextInSearchBar('Oval tube');
        cy.verifySearchResultsSuggestionListHasKey('Oval closet')*/

        cy.section('Search a synonym and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('garbage pullout');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        //cy.verifySearchResultsNameHasKey('trash')
        //only get results for waste synonym
        cy.verifySearchResultsNameHasKey('waste')
        cy.verifySearchResultsNameHasKey('pullout')

        cy.section('test data 2')
        cy.searchFromSearchBar('Fast cap');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('Fastcap')

        cy.section('test data 3')
        cy.searchFromSearchBar('bull nose');//not working-ask nimesha
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Bullnose')

        cy.section('test data 4')
        cy.searchFromSearchBar('Oval tube');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Oval closet')

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type a synonym in the search bar and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('Fast cap');
        cy.verifySearchResultsSuggestionListHasKey('Fastcap')

        cy.section('test data 2')
        cy.enterTextInSearchBar('bull nose');//not working-ask nimesha
        cy.verifySearchResultsSuggestionListHasKey('Bullnose')

        cy.section('test data 3')
        cy.enterTextInSearchBar('Oval tube');
        cy.verifySearchResultsSuggestionListHasKey('Oval closet')*/

        cy.section('Search a synonym and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('glide');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('slide')

        cy.section('test data 2')
        cy.searchFromSearchBar('straight arm ');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('full overlay')

        cy.section('test data 3')
        cy.searchFromSearchBar('thumb latch');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('door latch')

        /*cy.section('test data 4')
        cy.searchFromSearchBar('1 degree');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('°')

        cy.section('test data 5')
        cy.searchFromSearchBar('10 inch');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('"')

        cy.section('test data 6')
        cy.searchFromSearchBar('100 pound');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('lb')*/

    })

    it('WLC-TC-989.2 [Login] [Add to cart popup search] - Verify search results with synonyms', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type a synonym in the search bar and check the suggestion list')
        
        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 1')
        cy.enterTextAddtoCartSearchBar('lasy susan');
        cy.verifyAddToCartPopupSearchResultsSuggestionListHasKey('lazy susan')

        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 2')
        cy.enterTextAddtoCartSearchBar('Fast cap');
        cy.verifyAddToCartPopupSearchResultsSuggestionListHasKey('Fastcap')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 3')
        cy.enterTextAddtoCartSearchBar('bull nose');//not working-ask nimesha
        cy.verifyAddToCartPopupSearchResultsSuggestionListHasKey('Bullnose')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 4')
        cy.enterTextAddtoCartSearchBar('Oval tube');
        cy.verifyAddToCartPopupSearchResultsSuggestionListHasKey('Oval closet')*/

        cy.section('Verify search results with synonyms in search list')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('lasy susan');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('lazy susan')

        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 2')
        cy.searchFromAddtoCartSearchBar('garbage pullout');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('waste')
        cy.verifySearchResultsNameHasKey('pullout')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 3')
        cy.searchFromAddtoCartSearchBar('Fast cap');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsBrandHasKey('Fastcap')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 4')
        cy.searchFromAddtoCartSearchBar('bull nose');//not working-ask nimesha
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Bullnose')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 5')
        cy.searchFromAddtoCartSearchBar('Oval tube');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Oval closet')*/
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


