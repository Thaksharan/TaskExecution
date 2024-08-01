///<reference types="Cypress"/>
import HomePage from "../../PageObjects/HomePage";
import selectors from '../../support/selectors.js';

describe('Home Tests', () => {
    const homepage = new HomePage();

    //no need this since passing from env var
    // //Access data through hooks for multiple it blocks
    // let user_login_data
    // before(()=>{
    //   cy.fixture('validLogin').then((data)=>{
    //    user_login_data=data
    //   })
    // })

    beforeEach(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()
    })
    
    it('WLC-TC-387 Verify Home Page', () => {

        cy.step('verify user name')
        //cy.verifyLabel('Hi! ' + user_login_data.firstName);
        cy.verifyLabel('Hi! ' + Cypress.env('firstName'));

        cy.step('verify main navigation tabs')
        cy.verifyNavigationTabLinkAttribute('Home', '/');
        cy.verifyNavigationTabLinkAttribute('Laminate Finder', '/laminate-finder');
        cy.verifyNavigationTabLinkAttribute('My Orders', '/myaccount/orderhistory');
        cy.verifyNavigationTabLinkAttribute('Purchased Items', '/myaccount/purchaseditems');
        cy.verifyNavigationTabLinkAttribute('Favorites', '/myaccount/myfavorites');
        cy.verifyNavigationTabLinkAttribute('User Management', '/myaccount/manage-users');

        cy.step('click View Account History')
        //homepage.clickViewAccountHistory();
        cy.clickViewAccountHistory()
        homepage.verifyMyAccountDropdownSelectors();
        //homepage.clickViewAccountHistory();
        cy.clickViewAccountHistory()

        cy.step('click on setAccountShippingAddress link')
        //cy.clickOnItem('swap_horiz');
        homepage.clickShippingAddress()
        cy.verifyAccountShippingAddressDisplayed()
        cy.clickOnFirstRadio();
        cy.clickCloseButton()

        cy.step('verify Featured Brands')
        cy.verifyLabelAndScroll('h1', 'Featured Brand');
        homepage.verifyFourFeaturedBrands();
        homepage.verifyInsideFeaturedBrand();
        
        cy.step('click View item')
        cy.verifyAndClickLink('View item');
        cy.scrollDown(0, 800);

        cy.step('verify product page links')
        cy.verifyAndClickLink('Variations');
        cy.verifyAndClickLink('Product Details');
        cy.verifyAndClickLink('Accessories & Related Products');
        cy.verifyAndClickLink('Documents');
        cy.verifyAndClickLink('FAQs');
        cy.scrollUp(selectors.scrollTop);

        cy.step('verify And Click Wurth Logo')
        homepage.verifyAndClickWurthLogo();
        cy.wait(5000);
        cy.scrollDown(0, 3000);

        cy.step('verify Footer')
        cy.verifyFooter(selectors.footer);
        homepage.verifyFooterStaticPages();
        homepage.verifyGoogleTranslator();
        cy.verifyAndClickLink("About Us");
        cy.verifyAndClickLink("Shopping Cart");
        
    })

})


