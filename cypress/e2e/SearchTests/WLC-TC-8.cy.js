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

    it('WLC-TC-8.1 [LoggedOut][Login] [Top bar search ] - Verify the product data able to search by Manufacturer Part number', () => {
        //Logout -Seaarch
        cy.section('LoggedOut-search Manufacturer Part number of a product')

        cy.section('test data 1')
        cy.searchFromSearchBar('9071627');
        productpage.verifyProductName('Cross Mounting Plate with Euro Screw, Nickel-Plated, 3mm')

        cy.section('test data 2')
        cy.searchFromSearchBar('N18125A');
        productpage.verifyProductName('1-1/4" Brad Nail, 18 Gauge, Box of 5 Thousand')

        //cy.section('LoggedOut-search Manufacturer Part number of a product partially')

        cy.section('Enter the First part of the Manufacturer Part number of a product in the Search bar')

        cy.section('test data 1')
        //old data-Manufacturer Part # : 9011 for se901 item
        cy.searchFromSearchBar('RV DM KIT');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        //product related to partaial value
        // cy.verifySearchResultsNameHasKey('SeamFil Laminate Repair 1 oz Tube')
        cy.verifySearchResultsContainItemName('Door-Mount Kit for Waste Containers Frames')
        //cy.screenshot({capture:'runner'})

        cy.section('test data 2')
        //WPRO-1MD1-MB
        cy.searchFromSearchBar('KVSUMB 90');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('21" Samet Smart Slide for 5/8" Material Full Power Undermount Drawer Slide for 5/8" Material, Full Extension Soft-Closing')

        cy.section('LoggedOut-Enter the Middle part of the Manufacturer Part number of a product in the Search bar')

        cy.section('test data 1')
        //WPRO-1MD1-MB
        cy.searchFromSearchBar('SUMB 903');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('18" Samet Smart Slide for 5/8" Material Full Power Undermount Drawer Slide for 5/8" Material, Full Extension Soft-Closing')

        cy.section('test data 2')
        //50051138543711
        cy.searchFromSearchBar('6-9901');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('Chroma-Chem 896 Lamp Black Colorant')

        cy.section('LoggedOut-Enter the End part of the Manufacturer Part number of a product in the Search bar')

        cy.section('test data 1')
        //WPRO-1MD1-MB
        cy.searchFromSearchBar('2500-ALR');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('Dynapro Left/Right Adjustable Rear Adaptor for 3-D Slides')

        cy.section('test data 2')
        //50051138176681
        cy.searchFromSearchBar('9761228');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('Tiomos Adjustment Wing Mounting Plate with Pre-Mounted Euro Screws, 4-Point Fixing, Nickel-Plated, Screw-On, 0mm')

        cy.section('search invalid Manufacturer Part number ')
        cy.searchFromSearchBar('976ADEF28');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp();


        //Login- Search
        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.section('search Manufacturer Part number of a product')

        cy.section('test data 1')
        cy.searchFromSearchBar('SS18-BD200');
        productpage.verifyProductName('250ml Premium Solid Surface Adhesive Dispensing Gun')

        cy.section('test data 2')
        cy.searchFromSearchBar('WPRO-1MD7-MB');
        productpage.verifyProductName('128mm Mod Bar Pull, Matte Black')

        cy.section('test data 3')
        cy.searchFromSearchBar('50051138176681');
        productpage.verifyProductName('501 Prefilter Retainer')

        //cy.section('search Manufacturer Part number of a product partially')

        cy.section('Enter the First part of the Manufacturer Part number of a product in the Search bar')

        cy.section('test data 1')
        //old data-Manufacturer Part # : 9011 for se901 item
        cy.searchFromSearchBar('S2A637X');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        //product related to partaial value
        // cy.verifySearchResultsNameHasKey('SeamFil Laminate Repair 1 oz Tube')
        cy.verifySearchResultsContainItemName('94° Opening Angle Reduction Clip Nickel-Plated')
        //cy.screenshot({capture:'runner'})

        cy.section('test data 2')
        //WPRO-1MD1-MB
        cy.searchFromSearchBar('WPRO1M');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('1-7/32" Mod Round Knob, Matte Black')

        cy.section('test data 3')
        //50051138176681
        cy.searchFromSearchBar('50051138');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('501 Prefilter Retainer')

        cy.section('Enter the Middle part of the Manufacturer Part number of a product in the Search bar')

        cy.section('test data 1')
        //WPRO-1MD1-MB
        cy.searchFromSearchBar('RO1MD1');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('1-7/32" Mod Round Knob, Matte Black')

        cy.section('test data 2')
        //50051138543711
        cy.searchFromSearchBar('385437');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('8577 P95 Particulate Respirator with Exhale Valve, Case of 80')

        cy.section('Enter the End part of the Manufacturer Part number of a product in the Search bar')

        cy.section('test data 1')
        //WPRO-1MD1-MB
        cy.searchFromSearchBar('1MD1-MB');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('1-7/32" Mod Round Knob, Matte Black')

        cy.section('test data 2')
        //50051138176681
        cy.searchFromSearchBar('176681');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('501 Prefilter Retainer')

        cy.section('search invalid Manufacturer Part number ')
        cy.searchFromSearchBar('AAIO56SGH');
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");
        cy.clickOKBtninPopUp();
    })

    it('WLC-TC-8.2 [Login] [Add to cart popup search  ] - Verify the product data able to search by Manufacturer Part number', () => {

        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search Manufacturer Part number of a product')
        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('SS18-BD200');
        productpage.verifyProductName('250ml Premium Solid Surface Adhesive Dispensing Gun')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 2')
        // cy.searchFromAddtoCartSearchBar('WPRO-1MD7-MB');
        // productpage.verifyProductName('128mm Mod Bar Pull, Matte Black')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 3')
        // cy.searchFromAddtoCartSearchBar('50051138176681');
        // productpage.verifyProductName('501 Prefilter Retainer')

        // ////

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Enter the First part of the Manufacturer Part number of a product in the Search bar')

        cy.section('test data 1')
        cy.searchFromAddtoCartSearchBar('S2A637X');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('94° Opening Angle Reduction Clip Nickel-Plated')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 2')
        // //WPRO-1MD1-MB
        // cy.searchFromAddtoCartSearchBar('WPRO1M');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsContainItemName('1-7/32" Mod Round Knob, Matte Black')

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 3')
        // //50051138176681
        // cy.searchFromAddtoCartSearchBar('50051138');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsContainItemName('501 Prefilter Retainer')

        // ////

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('Enter the End part of the Manufacturer Part number of a product in the Search bar')

        cy.section('test data 1')
        //WPRO-1MD1-MB
        cy.searchFromAddtoCartSearchBar('1MD1-MB');
        cy.getSearchResultsCount()
        cy.verifySearchResultsIsLoaded()
        cy.verifySearchResultsContainItemName('1-7/32" Mod Round Knob, Matte Black')

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        // cy.section('test data 2')
        // //50051138176681
        // cy.searchFromAddtoCartSearchBar('176681');
        // cy.getSearchResultsCount()
        // cy.verifySearchResultsIsLoaded()
        // cy.verifySearchResultsContainItemName('501 Prefilter Retainer')


        // ////

        // productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

        cy.section('search invalid Manufacturer Part number ')
        cy.searchFromAddtoCartSearchBar('9011bbb');
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


