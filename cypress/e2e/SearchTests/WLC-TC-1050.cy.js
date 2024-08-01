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

    it('WLC-TC-1050.1 [LoggedOut][Login] [Top bar search ] - verify Search keys with any special character', () => {

        /*cy.section('Type word with special character and check in Suggestion List')

        cy.section('test data 1')
       // cy.searchFromSearchBar('WIPE + TONE');
       //cy.getSearchResultsCount()
        //cy.verifySearchResultsIsLoaded()
        //cy.verifySearchResultsNameHasKey('+')
        cy.enterTextInSearchBar('WIPE + TONE')      
        cy.verifySearchResultsSuggestionListHasKey('+')

        cy.section('test data 2')
        cy.enterTextInSearchBar('# 5.5')      
        cy.verifySearchResultsSuggestionListHasKey('#')

        /*cy.section('test data 3')
        cy.enterTextInSearchBar('TapeNix™')      
        cy.verifySearchResultsSuggestionListHasKey('™')*/

        cy.section('search word with special character and check in Searched results')

        cy.section('test data 1')
        cy.searchFromSearchBar('#6 Screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('#')

        cy.section('test data 2')
        cy.searchFromSearchBar('$10,000 wipe stain');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('$')

        cy.section('test data 3')
        cy.searchFromSearchBar('TapeNix™');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('™')

        /*cy.section('Compare search word with/without special character trademark in suggestion list')

        cy.section('test data 1')
        cy.compareTwoSugestionListResultsAreEqual('cypres™ decorative bar pull','cypres decorative bar pull')

        /*cy.section('test data 2')
        cy.compareTwoSugestionListResultsAreEqual('Fastbreak™','Fastbreak')*/

        /*cy.section('test data 3')
        cy.compareTwoSugestionListResultsAreEqual('KingKore®White','KingKore White')

        cy.section('test data 4')
        cy.compareTwoSugestionListResultsAreEqual('Powerdriv® ','Powerdriv')

        cy.section('test data 5')
        cy.compareTwoSugestionListResultsAreEqual('Zebra©','Zebra')*/
        
        cy.section('Compare search word with/without special character trademark searched result page')

        cy.section('test data 1')
        cy.compareTwoSearchResultsAreEqual('Fastbreak™','Fastbreak')

        /*cy.section('test data 2')
        cy.compareTwoSearchResultsAreEqual('cypres™ decorative bar pull','cypres decorative bar pull')*/

        /*cy.section('test data 3')
        cy.compareTwoSearchResultsAreEqual('KingKore®White','KingKore White')
        
        cy.section('test data 4')
        cy.compareTwoSearchResultsAreEqual('Powerdriv® ','Powerdriv')
        
        cy.section('test data 5')
        cy.compareTwoSearchResultsAreEqual('Zebra©','Zebra')*/

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type word with special character and check in Suggestion List')

        cy.section('test data 1')
       // cy.searchFromSearchBar('WIPE + TONE');
       //cy.getSearchResultsCount()
        //cy.verifySearchResultsIsLoaded()
        //cy.verifySearchResultsNameHasKey('+')
        cy.enterTextInSearchBar('BASE + ADJUSTABLE PLATFORM(EACH)')      
        cy.verifySearchResultsSuggestionListHasKey('+')

        cy.section('test data 2')
        cy.enterTextInSearchBar('#2 x 1"')      
        cy.verifySearchResultsSuggestionListHasKey('#')

        /*cy.section('test data 3')
        cy.enterTextInSearchBar('TapeNix™')      
        cy.verifySearchResultsSuggestionListHasKey('™')*/

        cy.section('search word with special character and check in Searched results')

        cy.section('test data 1')
        cy.searchFromSearchBar('gallons only!');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('!')

        cy.section('test data 2')
        cy.searchFromSearchBar('358/359M+K');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('+')

        cy.section('test data 3')
        cy.searchFromSearchBar('TapeNix™ Temporary Drawer Pull 100/Pack');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('™')

        cy.section('Compare search word with/without special character trademark searched result page')

        cy.section('test data 1')
        cy.compareTwoSearchResultsAreEqual('Powerdriv® ','Powerdriv')
    
    })

    it('WLC-TC-1050.2 [Login] [Add to cart popup search] - verify Search keys with any special character', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Type any word with special character and check in suggestion list')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        //cy.wait(9000)

        cy.section('Type any word with special character - test data 1')
        // cy.searchFromAddtoCartSearchBar('WIPE + TONE');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsNameHasKey('+')
        cy.enterTextAddtoCartSearchBar('WIPE + TONE'')      
        cy.verifySearchResultsSuggestionListHasKey('+')
        cy.clickCloseBtnOnCartPopup()

        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('Type any word with special character - test data 2')
        cy.enterTextAddtoCartSearchBar('TapeNix™')      
        cy.verifySearchResultsSuggestionListHasKey('™')
        cy.clickCloseBtnOnCartPopup()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.section('Type any word with special character - test data 3')
        cy.enterTextAddtoCartSearchBar('# 5.5')      
        cy.verifySearchResultsSuggestionListHasKey('#')
        cy.clickCloseBtnOnCartPopup()*/

        cy.section('search any word with special character in searched list')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search any word with special character - test data 1')
        cy.searchFromAddtoCartSearchBar('MPA SV+ 500ml Sealing Spray');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('+')

        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search any word with special character - test data 2')
        cy.searchFromAddtoCartSearchBar('TapeNix™');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('™')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search any word with special character - test data 3')
        cy.searchFromAddtoCartSearchBar('# 5.5');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsNameHasKey('#')*/
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


