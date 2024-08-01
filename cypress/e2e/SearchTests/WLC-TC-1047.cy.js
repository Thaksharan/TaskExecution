///<reference types="Cypress"/>
import ProductPage from '../../PageObjects/ProductPage.js';
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const productpage=new ProductPage()
    const shoppingcartpage=new ShoppingCartPage();

    beforeEach(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-1047.1 [LoggedOut][Login] [Top bar search ] -  Verify search results by multiple key words', () => {

        /*cy.section('Enter a multiple key word and check in Suggestion List')
        cy.section('test data 1') 
        cy.enterTextInSearchBar('3/4" overlay hinge')      
        cy.verifySearchResultsSuggestionListHasKey('3/4" overlay')

        cy.section('test data 2') 
        cy.enterTextInSearchBar('clip top 45mm')      
        cy.verifySearchResultsSuggestionListHasKey('clip top')
        cy.verifySearchResultsSuggestionListHasKey('45mm')*/

        /*cy.section('test data 3') 
        cy.enterTextInSearchBar('ives edge pull')      
        cy.verifySearchResultsSuggestionListHasKey('edge pull')*/

        cy.section('Enter a multiple key word search term in results page')

        cy.section('test data 1') 
        cy.searchFromSearchBar('Mod Round Knob');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Mod Round Knob')

        cy.section('test data 2') 
        cy.searchFromSearchBar('Single 35 QT Bottom Mount Waste Container');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Single 35 QT Bottom-Mount Waste Container')

        cy.section('test data 3') 
        cy.searchFromSearchBar('drawer slide for 5/8"');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('Drawer Slide for 5/8"')

        // cy.section('Enter a multiple key word search term')
        // cy.searchFromSearchBar('clip top 45mm');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsNameHasKey('clip top')
        // cy.verifySearchResultsNameHasKey('45mm')

        // cy.section('Enter a multiple key word search term')
        // cy.searchFromSearchBar('ives edge pull');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsNameHasKey('edge pull')

        // cy.section('Type only special character in logged-out state')
        // cy.searchFromSearchBar('+');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsNameHasKey('+')

        cy.section('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.section('Enter a multiple key word and check in Search results page')
        cy.section('test data 1') 
        cy.searchFromSearchBar('3/4" overlay hinge')    
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('3/4" overlay')
        cy.verifySearchResultsNameHasKey('hinge')

        cy.section('test data 2') 
        cy.searchFromSearchBar('clip top 45mm')      
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('clip top')
        cy.verifySearchResultsNameHasKey('45mm')

        cy.section('test data 3') 
        cy.searchFromSearchBar('ives edge pull')    
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()  
        cy.verifySearchResultsNameHasKey('edge pull')

        /*cy.section('Enter a multiple key word search term')
        cy.searchFromSearchBar('3/4" overlay hinge');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('3/4" overlay')*/

        // cy.section('Enter a multiple key word search term')
        // cy.searchFromSearchBar('clip top 45mm');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsNameHasKey('clip top')
        // cy.verifySearchResultsNameHasKey('45mm')

        // cy.section('Enter a multiple key word search term')
        // cy.searchFromSearchBar('ives edge pull');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsNameHasKey('edge pull')
        

    })

    it('WLC-TC-1047.2 [Login] [Add to cart popup search] - Verify search results by multiple key words', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('Enter a multiple key word and check in Add to Cart popup search Suggestion List')
        cy.section('test data 1') 
        cy.enterTextAddtoCartSearchBar('Pro t bar pull')      
        cy.verifySearchResultsSuggestionListHasKey('T-Bar Pull')
        cy.clickCloseBtnOnCartPopup()

        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 2') 
        cy.enterTextAddtoCartSearchBar('clip top 45mm')      
        cy.verifySearchResultsSuggestionListHasKey('clip top')
        cy.verifySearchResultsSuggestionListHasKey('45mm')
        cy.clickCloseBtnOnCartPopup()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('test data 3') 
        cy.enterTextAddtoCartSearchBar('ives edge pull')      
        cy.verifySearchResultsSuggestionListHasKey('edge pull')
        cy.clickCloseBtnOnCartPopup()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('Enter a multiple key word search term')
        cy.searchFromAddtoCartSearchBar('3/4" overlay hinge');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('3/4" overlay')*/

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        // cy.section('Enter a multiple key word search term')
        // cy.searchFromAddtoCartSearchBar('clip top 45mm');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsNameHasKey('clip top')
        // cy.verifySearchResultsNameHasKey('45mm')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        // cy.section('Enter a multiple key word search term')
        // cy.searchFromAddtoCartSearchBar('ives edge pull');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsNameHasKey('edge pull')
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


