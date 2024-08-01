///<reference types="Cypress"/>
import HomePage from '../../PageObjects/HomePage.js';
import ProductPage from "../../PageObjects/ProductPage";
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import selectors from '../../support/selectors.js';

describe('Search Tests', () => {
    const homepage = new HomePage();
    const productpage = new ProductPage()
    const shoppingcartpage=new ShoppingCartPage();

    beforeEach(() => {
        cy.visit('/')
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-7.1 [LoggedOut][Login]  [Top bar search ] - Verify the product data able to search by Material Number/item#/SKU', () => {

        cy.section('Logout-search the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromSearchBar('L-C25199P-1G');
        productpage.verifyProductName('FOP WHITE CHEMLIFE WHITE')

        cy.section('test data 3')
        cy.searchFromSearchBar('AD1316-CLR/450');
        productpage.verifyProductName('Small Clear Bumper, 450/Sheet')

       // cy.section('search Material Number/item#/SKU number of a product partially')
        cy.section('Logout-Enter First part of the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromSearchBar('HET909');
        cy.verifySearchResultsSKUHasText('HET909')

        cy.section('test data 2')
        cy.searchFromSearchBar('L-C2519');
        cy.verifySearchResultsSKUHasText('L-C2519')
        

        cy.section('Logout-Enter Middle part of the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromSearchBar('8400-2');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('8400-2')

        cy.section('test data 2')
        cy.searchFromSearchBar('P134-1');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('P134-1')

        cy.section('Logout-Enter End part of the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromSearchBar('4465-OE');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('4465-OE')

        cy.section('Logout -search invalid Material Number/item#/SKU Part number ')

        cy.searchFromSearchBar('ayui234');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp()

        //Login- Search
        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.section('Login-search the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromSearchBar('SE901');
        productpage.verifyProductName('SeamFil Laminate Repair 1 oz Tube, White')

        cy.section('test data 2')
        cy.searchFromSearchBar('AB10010');
        productpage.verifyProductName('1" Chip Brush')

        cy.section('test data 3')
        cy.searchFromSearchBar('WRBS07-CLR');
        productpage.verifyProductName('3/8" Diameter Hemispherical Door Bumper, Clear, 0.8" High, Hard, 75/Sheet')

       // cy.section('search Material Number/item#/SKU number of a product partially')
        cy.section('Login-Enter First part of the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromSearchBar('SE90');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        //cy.verifySearchResultsContainItemName('SeamFil Laminate Repair 1 oz Tube, White')
        cy.verifySearchResultsSKUHasText('SE90')
        //cy.screenshot({capture:'runner'})

        cy.section('test data 2')
        cy.searchFromSearchBar('RV18PB');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('RV18PB')
        

        // cy.section('test data 3')
        // //RV5345-DMKIT
        // cy.searchFromSearchBar('RV5349');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsSKUHasText('RV5349')

        // cy.section('test data 4')
        // cy.searchFromSearchBar('iv22');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsSKUHasText('iv22')

        cy.section('Login-Enter Middle part of the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromSearchBar('18PB2');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('18PB2')

        cy.section('test data 2')
        cy.searchFromSearchBar('NSSF14');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('NSSF14')

        // cy.section('test data 3')
        // cy.searchFromSearchBar('534910');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsSKUHasText('534910')

        cy.section('Login-Enter End part of the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromSearchBar('PB2WH');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('PB2WH')

        cy.section('Login-search invalid Material Number/item#/SKU Part number ')

        // cy.section('test data 1')
        // cy.searchFromSearchBar('9011bbb');
        // cy.verifyLabel('h5', 'Item Not Found');
        // cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");

        cy.searchFromSearchBar('AAIO56SGH');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");

    })


    it('WLC-TC-7.2 [Login] [Add to cart popup search ] - Verify the product data able to search by Material Number/item#/SKU', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search the Material Number/item#/SKU of a product in the Search bar')
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('SE901')
        productpage.verifyProductName('SeamFil Laminate Repair 1 oz Tube, White')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 2')
        // cy.searchFromAddtoCartSearchBar('AB10010')
        // productpage.verifyProductName('1" Chip Brush')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 3')
        // cy.searchFromAddtoCartSearchBar('WRBS07-CLR')
        // productpage.verifyProductName('3/8" Diameter Hemispherical Door Bumper, Clear, 0.8" High, Hard, 75/Sheet')

        ////

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Enter First part of the Material Number/item#/SKU of a product in the Search bar')
        // se901 item
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('RV18PB');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('RV18PB')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 2')
        // cy.searchFromAddtoCartSearchBar('RV5349');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsSKUHasText('RV5349')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 3')
        // cy.searchFromAddtoCartSearchBar('iv22');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsSKUHasText('iv22')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Enter Middle part of the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('18PB2');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('18PB2')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 2')
        // cy.searchFromAddtoCartSearchBar('NSSF14');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsSKUHasText('NSSF14')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 3')
        // cy.searchFromAddtoCartSearchBar('534910');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsSKUHasText('534910')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Enter End part of the Material Number/item#/SKU of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('PB2WH');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsSKUHasText('PB2WH')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search invalid Material Number/item#/SKU Part number ')
        cy.searchFromAddtoCartSearchBar('AAIO56SGH');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp();

    
    })

    after(()=>{
        cy.step('data clear action::test items delete from cart')
        cy.clickViewCartOnHeader();
        shoppingcartpage.clearAllItemsOnCart()
    })

})


