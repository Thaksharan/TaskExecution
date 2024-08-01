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

    it('WLC-TC-1124.1 [LoggedOut][Login] [Top bar search]-Verify the search results for partial part number(SKU) + product title ', () => {

        /*cy.section('Enter First part of the material number(SKU) + product title and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('proco t bar pull');
        cy.verifySearchResultsSuggestionListSKUHasKey('PROCO')
        cy.verifySearchResultsSuggestionListHasKey('T-bar pull')

        cy.section('test data 2')
        cy.enterTextInSearchBar('iv22 flush pull');
        cy.verifySearchResultsSuggestionListSKUHasKey('IV22')
        cy.verifySearchResultsSuggestionListHasKey('flush pull')*/

        /*cy.section('test data 3')
        cy.enterTextInSearchBar('KVSUN 18 inch smart slide');
        cy.verifySearchResultsSuggestionListSKUHasKey('KVSUN')
        cy.verifySearchResultsSuggestionListHasKey('18"')
        cy.verifySearchResultsSuggestionListHasKey('smart slide')*/

        cy.section('Enter First part of the material number(SKU) + product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('rv18pb waste container');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('RV18PB')
        cy.verifySearchResultsNameHasKey('waste container')

        cy.section('test data 2')
        cy.searchFromSearchBar('rv5349 pullout');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('RV5349')
        cy.verifySearchResultsNameHasKey('pullout')

        cy.section('test data 3')
        cy.searchFromSearchBar('WR0190 1-3/8" x 8 flat head ');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('WR0190')
        cy.verifySearchResultsNameHasKey('1-3/8" x 8 flat head')

        /*cy.section('Enter middle part of the material number(SKU) + product title and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('roco15 t-bar pull');
        cy.verifySearchResultsSuggestionListSKUHasKey('ROCO15')
        cy.verifySearchResultsSuggestionListHasKey('T-bar pull')

        cy.section('test data 2')
        cy.enterTextInSearchBar('SUNDM 18 inch smart slide');
        cy.verifySearchResultsSuggestionListSKUHasKey('SUNDM')
        cy.verifySearchResultsSuggestionListHasKey('18"')
        cy.verifySearchResultsSuggestionListHasKey('smart slide')*/

        cy.section('Enter middle part of the material number(SKU) + product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('5349 pullout');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('5349')
        cy.verifySearchResultsNameHasKey('pullout')

        cy.section('test data 2')
        cy.searchFromSearchBar('19014 1-3/8" x 8 flat head');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('19014')
        cy.verifySearchResultsNameHasKey('1-3/8" x 8 flat head')

        /*cy.section('Enter End part of the material number(SKU) + product title and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('CO15SN t-bar pull');
        cy.verifySearchResultsSuggestionListSKUHasKey('CO15-SN')
        cy.verifySearchResultsSuggestionListHasKey('T-bar pull')

        cy.section('test data 2')
        cy.enterTextInSearchBar('DM18B 18 smart slide');
        cy.verifySearchResultsSuggestionListSKUHasKey('DM-18B')
        cy.verifySearchResultsSuggestionListHasKey('18"')
        cy.verifySearchResultsSuggestionListHasKey('smart slide')*/

        cy.section('Enter End part of the material number(SKU) + product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('DM1WH pullout');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('DM-1WH')
        cy.verifySearchResultsNameHasKey('pullout')

        cy.section('test data 2')
        cy.searchFromSearchBar('14035 1-3/8" x 8 flat head');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('14035')
        cy.verifySearchResultsNameHasKey('1-3/8" x 8 flat head')

        cy.section('Enter invalid the material number(SKU) + valid product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('X1AB flush pull');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp();

        /*cy.section('Enter a valid the material number(SKU) + invalid product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('RV5439 flush pull');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp();*/

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        /*cy.section('Enter First part of the material number(SKU) + product title and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('sgif flipper doors');
        cy.verifySearchResultsSuggestionListSKUHasKey('SGIF')
        cy.verifySearchResultsSuggestionListHasKey('flipper door')

        cy.section('test data 2')
        cy.enterTextInSearchBar('promd curved knob');
        cy.verifySearchResultsSuggestionListSKUHasKey('PROMD')
        cy.verifySearchResultsSuggestionListHasKey('curved knob')

        cy.section('test data 3')
        cy.enterTextInSearchBar('wrbs 3/8" door bumper');
        cy.verifySearchResultsSuggestionListSKUHasKey('WRBS')
        cy.verifySearchResultsSuggestionListHasKey('3/8"')
        cy.verifySearchResultsSuggestionListHasKey('door bumper')*/

        cy.section('Enter First part of the material number(SKU) + product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('RV6472 lazy susan');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('RV6472')
        cy.verifySearchResultsNameHasKey('lazy susan')

        cy.section('test data 2')
        cy.searchFromSearchBar('WUDW7X 1" drywall screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('WUDW7X')
        cy.verifySearchResultsNameHasKey('1"')
        cy.verifySearchResultsNameHasKey('drywall screw')

        cy.section('test data 3')
        cy.searchFromSearchBar('WR0190 1-3/8" x 8 flat head ');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('WR0190')
        cy.verifySearchResultsNameHasKey('1-3/8" x 8 flat head')

        /*cy.section('Enter middle part of the material number(SKU) + product title and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('GIF360 flipper doors');
        cy.verifySearchResultsSuggestionListSKUHasKey('GIF360')
        cy.verifySearchResultsSuggestionListHasKey('flipper door')

        cy.section('test data 2')
        cy.enterTextInSearchBar('romd3 curved knob');
        cy.verifySearchResultsSuggestionListSKUHasKey('ROMD3')
        cy.verifySearchResultsSuggestionListHasKey('curved knob')*/

        cy.section('Enter middle part of the material number(SKU) + product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('V6472 lazy susan');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('V6472')
        cy.verifySearchResultsNameHasKey('lazy susan')

        cy.section('test data 2')
        cy.searchFromSearchBar('DW7X1B 1" drywall screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('DW7X1B')
        cy.verifySearchResultsNameHasKey('1"')
        cy.verifySearchResultsNameHasKey('drywall screw')

        /*cy.section('Enter End part of the material number(SKU) + product title and check the suggestion list')

        cy.section('test data 1')
        cy.enterTextInSearchBar('S07CLR 3/8" door bumper ');
        cy.verifySearchResultsSuggestionListSKUHasKey('S07-CLR')
        cy.verifySearchResultsSuggestionListHasKey('3/8"')
        cy.verifySearchResultsSuggestionListHasKey('door bumper')

        cy.section('test data 2')
        cy.enterTextInSearchBar('MD3SN curved knob');
        cy.verifySearchResultsSuggestionListSKUHasKey('MD3-SN')
        cy.verifySearchResultsSuggestionListHasKey('curved knob')*/


        cy.section('Enter End part of the material number(SKU) + product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('7232AL lazy susan');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('72-32AL')
        cy.verifySearchResultsNameHasKey('lazy susan')

        cy.section('test data 2')
        cy.searchFromSearchBar('1BCPBT 1" drywall screw');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('1BCPBT')
        cy.verifySearchResultsNameHasKey('1"')
        cy.verifySearchResultsNameHasKey('drywall screw')

        cy.section('Enter invalid the material number(SKU) + valid product title and check the results page')

        cy.section('test data 1')
        cy.searchFromSearchBar('FR01 titebond glue');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp();
        cy.section('Enter a valid the material number(SKU) + invalid product title and check the results page')

        /*cy.section('test data 1')
        cy.searchFromSearchBar('se90 door bumper');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp();*/

    })

    it('WLC-TC-1124.2 [Login] [Add to cart popup search] - Verify the search results for partial part number(SKU) + product title ', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('RV4WC waste pullout');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('RV4WC')
        cy.verifySearchResultsNameHasKey('waste')
        cy.verifySearchResultsNameHasKey('pullout')

        /*productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('E1284 1/4" Shelf Support');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('E1284')
        cy.verifySearchResultsNameHasKey('1/4" Shelf Support')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('160WHT docking drawer');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('160-WHT')
        cy.verifySearchResultsNameHasKey('docking drawer')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Enter invalid the material number(SKU) + valid product title and check the results page')

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('X1AC drawer slide');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp();*/
    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

    
    
})
