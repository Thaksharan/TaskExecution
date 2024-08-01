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

    it('WLC-TC-1046.1 [LoggedOut][Login] [Top bar search ] - Verify search results with plurals', () => {

        /*cy.section('plural search term should return the same results in Suggestion list as the singular search term.')
        
        cy.section('test data 1')
        cy.compareTwoSugestionListResultsAreEqual('3 wing','3 wings')

        cy.section('test data 2')
        cy.compareTwoSugestionListResultsAreEqual('closet rod end','closet rod ends')

        cy.section('test data 3')
        cy.compareTwoSugestionListResultsAreEqual('1" drywall screw','1" drywall screws')

        cy.section('test data 4')
        cy.compareTwoSugestionListResultsAreEqual('door mount spice rack','door mount spice racks')*/

        cy.section('plural search term should return the same results as the singular search term in results page.')

        cy.section('test data 1')
        cy.compareTwoSearchResultsAreEqual('3 wing','3 wings')
        
        cy.section('test data 2')
        cy.compareTwoSearchResultsAreEqual('1" drywall screw','1" drywall screws')

        cy.section('test data 3')
        cy.compareTwoSearchResultsAreEqual('door mount spice rack','door mount spice racks')

        cy.section('test data 4')
        cy.compareTwoSearchResultsAreEqual('closet rod end','closet rod ends')

        cy.section('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('plural search term should return the same results in Suggestion list as the singular search term.')
        
        cy.section('test data 1')
        cy.compareTwoSugestionListResultsAreEqual('3 wing','3 wings')

        cy.section('test data 2')
        cy.compareTwoSugestionListResultsAreEqual('closet rod end','closet rod ends')

        cy.section('test data 3')
        cy.compareTwoSugestionListResultsAreEqual('1" drywall screw','1" drywall screws')

        cy.section('test data 4')
        cy.compareTwoSugestionListResultsAreEqual('door mount spice rack','door mount spice racks')*/

        cy.section('plural search term should return the same results as the singular search term in results page.')
        
        cy.section('test data 1')
        cy.compareTwoSearchResultsAreEqual('26.2lb cylinder','26.2lb cylinders')

        cy.section('test data 2')
        cy.compareTwoSearchResultsAreEqual('Euro Door Stop Bumper','Euro Door Stop Bumpers')

        cy.section('test data 3')
        cy.compareTwoSearchResultsAreEqual('1" x 6 drywall screw','1" x 6 drywall screws')

        cy.section('test data 4')
        cy.compareTwoSearchResultsAreEqual('Movento locking device','Movento locking devices')

    })


    it('WLC-TC-1046.2 [Login] [Add to cart popup search] - Verify search results with plurals', () => {
        //data of product adding to cart
        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('plural search term should return the same results as the singular search term in Suggestion List.')

        cy.section('test data 1') 
        cy.compareTwoSugestionListAddToCartSearchResultsAreEqual(skuNumber,productName,'3 wing','3 wings');

        cy.section('test data 2') 
        cy.compareTwoSugestionListAddToCartSearchResultsAreEqual(skuNumber,productName,'1" drywall screw','1" drywall screws');

        cy.section('test data 3') 
        cy.compareTwoSugestionListAddToCartSearchResultsAreEqual(skuNumber,productName,'closet rod end','closet rod ends');

        cy.section('test data 4') 
        cy.compareTwoSugestionListAddToCartSearchResultsAreEqual(skuNumber,productName,'door mount spice rack','door mount spice racks');*/

        cy.section('plural search term should return the same results as the singular search term in results page.')

        cy.section('test data 1') 
        cy.compareTwoSearchResultsAreEqualAddToCartSearch(skuNumber,productName,'0.5kg water base catalyst','0.5kg water base catalysts');
        
        /*cy.section('test data 2')
        cy.compareTwoSearchResultsAreEqualAddToCartSearch(skuNumber,productName,'3 wing','3 wings')

        cy.section('test data 3')
        cy.compareTwoSearchResultsAreEqualAddToCartSearch(skuNumber,productName,'closet rod end','closet rod ends')

        cy.section('test data 4')
        cy.compareTwoSearchResultsAreEqualAddToCartSearch(skuNumber,productName,'door mount spice rack','door mount spice racks')*/
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


