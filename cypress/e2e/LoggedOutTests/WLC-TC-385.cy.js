///<reference types="Cypress"/>
import ProductPage from "../../PageObjects/ProductPage";
//import selectors from '../../support/selectors.js';

describe('Logged Out Tests', () => {
    const productpage=new ProductPage();

    before(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()
       
    })
    
    it('WLC-TC-385 [Logged Out] Verify the Product Page Details', () => {

        cy.step('Click on feature brand View item button')
        cy.verifyLabelAndScroll('h1', 'Featured Brand');
        //homepage.verifyFourFeaturedBrands();
        //homepage.verifyInsideFeaturedBrand();
        cy.verifyAndClickLink('View item');

        cy.section('verify product main details')
        //TODO-check feature products change so should select randomly
        //productpage.verifyProductName('1/4" Unitized Wheel Mandrel');
        cy.step('select item variation from dropdown')
        productpage.selectItemvariationFromDropdownByIndex(1)
        // productpage.verifySelectedItemVariationDropdown('MA990-1/4')
        productpage.verifyQuantityLabel()
        productpage.verifyMinOrderLabel()
        productpage.verifyLoginToViewPriceBtn()

        cy.step('verify product image zoom in')
        productpage.clickProductMainImageToZoom()
        productpage.clickCloseInImage();

        cy.step('verify bottom selections on product page')
        cy.scrollDown(0,800);
        //cy.wait(8000);
        cy.verifyLink("Variations");
        cy.verifyLink("Product Details");
        cy.verifyLink("Accessories & Related Products");
        cy.verifyLink("Documents");
        cy.verifyLink("FAQs");

        //able to see available variations of variation section
        productpage.verifyVariation();

        //able to see available accessories and related items
        cy.clickLink("Accessories & Related Products");
        cy.verifyLabel('h4','Accessories and Related Products');

       
        
    })


})


