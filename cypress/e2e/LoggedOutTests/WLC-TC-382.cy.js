///<reference types="Cypress"/>
import HomePage from "../../PageObjects/HomePage";
import selectors from '../../support/selectors.js';

describe('Logged Out Tests', () => {
    const homepage = new HomePage();

    before(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()
       
    })
    
    it('WLC-TC-382 [Logged Out]  Verify the Home Page', () => {

        cy.verifyLink('Sign In');

        homepage.verifyMainSlider()
        //Move Sliders by clicking on
        homepage.clickMainSliderNextButton()

        homepage.verifyFeaturedProductsHeader()
        homepage.verifyFeaturedProductsSlider()
        
        cy.waitForStableDOM()
        cy.verifyLabelAndScroll('h1', 'Featured Brand');
        homepage.verifyFourFeaturedBrands();
        homepage.verifyInsideFeaturedBrand();
        cy.verifyAndClickLink('View item');
        //go back to homepage
        homepage.verifyAndClickWurthLogo();

        //middle banners(gov/catalog/machinery)
        cy.verifyLabelAndScroll('h3', 'Government');
        homepage.verifyMiddleCards()
        //cy.verifyHrefLinks('/government')
        // cy.verifyLinkInDOM('Government', '/government');
        // cy.verifyLinkInDOM('Learn More ', '/catalogs-literature');
        // cy.verifyLinkInDOM('Learn More ', 'https://www.wurthmachinery.com');

        //Click on google translator option
        homepage.verifyGoogleTranslator();

        cy.scrollDown(0, 3000);
        cy.verifyFooter(selectors.footer);

        //Click on Register Option
        // cy.clickonLink('Register');
        // cy.verifyLabel('h1', "Register Your User Profile");
        cy.clickRegister()

        //Click shopping cart Icon
        cy.verifyAndClickLink("Shopping Cart");

       
        
    })


})


