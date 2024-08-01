///<reference types="Cypress"/>
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const shoppingcartpage=new ShoppingCartPage();

    beforeEach(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-1049.1 [LoggedOut] [Top bar search ] - Verify search results where search keys with hyphen / without hyphen ', () => {

        /*cy.section('results for sugesstion list terms with hyphen should be same as the search term without hyphen')
        
        cy.section('test data 1')
        cy.compareTwoSugestionListResultsAreEqual('3-wing','3 wing')

        cy.section('test data 2')
        cy.compareTwoSugestionListResultsAreEqual('pro t bar pull','pro t-bar pull')

        /*cy.section('test data 3')
        cy.compareTwoSugestionListResultsAreEqual('Soft-Closing','Soft Closing')

        cy.section('test data 4')
        cy.compareTwoSugestionListResultsAreEqual('Under-Mount','Under Mount')*/
        
        cy.section('results for search terms with hyphen should be same as the search term without hyphen')
        
        cy.section('test data 1')
        cy.compareTwoSearchResultsAreEqual('3-wing','3 wing')

        cy.section('test data 2')
        cy.compareTwoSearchResultsAreEqual('pro t bar pull','pro t-bar pull')

        cy.section('test data 3')
        cy.compareTwoSearchResultsAreEqual('Soft-Closing','Soft Closing')

        /*cy.section('test data 4')
        cy.compareTwoSearchResultsAreEqual('Under-Mount','Under Mount')*/

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('results for sugesstion list terms with hyphen should be same as the search term without hyphen')
        
        cy.section('test data 1')
        cy.compareTwoSugestionListResultsAreEqual('3-wing','3 wing')

        cy.section('test data 2')
        cy.compareTwoSugestionListResultsAreEqual('pro t bar pull','pro t-bar pull')

        /*cy.section('test data 3')
        cy.compareTwoSugestionListResultsAreEqual('Soft-Closing','Soft Closing')

        cy.section('test data 4')
        cy.compareTwoSugestionListResultsAreEqual('Under-Mount','Under Mount')*/
        
        cy.section('results for search terms with hyphen should be same as the search term without hyphen')
        
        cy.section('test data 1')
        cy.compareTwoSearchResultsAreEqual('Silver Metallic','Silver-Metallic')

        cy.section('test data 2')
        cy.compareTwoSearchResultsAreEqual('Self Locking','Self-Locking')

        cy.section('test data 3')
        cy.compareTwoSearchResultsAreEqual('Satin Nickel Plated','Satin Nickel-Plated')

        /*cy.section('test data 4')
        cy.compareTwoSearchResultsAreEqual('Under-Mount','Under Mount')*/
        
    })

    it('WLC-TC-1049.2 [Login] [Add to cart popup search] - Verify search results where search keys with hyphen / without hyphen', () => {
        //data of product adding to cart
        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        //cy.section('results for sugesstion list terms with hyphen should be same as the search term without hyphen')
        
        /*cy.section('test data 1')
        cy.compareTwoSugestionListAddToCartSearchResultsAreEqual(skuNumber,productName,'3-wing','3 wing')

        /*cy.section('test data 2')
        cy.compareTwoSugestionListAddToCartSearchResultsAreEqual(skuNumber,productName,'pro t bar pull','pro t-bar pull')

        cy.section('test data 3')
        cy.compareTwoSugestionListAddToCartSearchResultsAreEqual(skuNumber,productName,'Soft-Closing','Soft Closing')

        cy.section('test data 4')
        cy.compareTwoSugestionListAddToCartSearchResultsAreEqual(skuNumber,productName,'Under-Mount','Under Mount')*/

        cy.section('results for search terms with hyphen should be same as the search term without hyphen') 

        cy.compareTwoSearchResultsAreEqualAddToCartSearch(skuNumber,productName,'Non Vacuum disc','Non-Vacuum disc');

        /*cy.compareTwoSearchResultsAreEqualAddToCartSearch(skuNumber,productName,'pro t bar pull','pro t-bar pull');

        cy.compareTwoSearchResultsAreEqualAddToCartSearch(skuNumber,productName,'Soft-Closing','Soft Closing');

        cy.compareTwoSearchResultsAreEqualAddToCartSearch(skuNumber,productName,'Under-Mount','Under Mount');*/
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


