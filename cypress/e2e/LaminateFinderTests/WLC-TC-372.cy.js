//import selectors from '../../support/selectors.js';
import LaminateFinderPage from "../../PageObjects/LaminateFinderPage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";

    describe('Laminate Finder Tests',() =>{
    const laminateFinderPage=new LaminateFinderPage()
    const shoppingcartpage=new ShoppingCartPage()

    before(()=>{
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickOnMainNavTab('Laminate Finder')
        cy.verifyCountrySelectorPopupDisplayed()
        cy.enterCountryInCountrySelectorPopup("US")
        cy.clickContinuInCountrySelectorPopup()
        laminateFinderPage.verifyNavigateToLaminateFinderPage()
        laminateFinderPage.verifyLaminateListLoaded()
        cy.step('Type laminate that has grade and finish in the search bar')
        laminateFinderPage.searchLaminates('101 Black')
        laminateFinderPage.verifySearchByColorCodeAndName('Black','101')
        cy.step('Click on searched product from the laminate finder page')
        laminateFinderPage.clickLaminateTile()
        cy.step('verify Price and availability popup')
        laminateFinderPage.verifyPriceAvailabilityPopupDisplayed()
    } ) 

    it('WLC-TC-372 [Logged Out]  Verify List of Matching Edgebander(s) in Logged Out State' , () =>{

        //check tc
        cy.step('verify Matching Edgebanding Available for selected product')
        laminateFinderPage.verifyMatchingEdgebandingAvailable()

        cy.step('Click on the expand arrows of a matching edgeband')
        laminateFinderPage.clickMatchingEdgeBand()

        cy.step('verify details of the matching edge band')
        laminateFinderPage.verifyMatchingEdgeBandView()

        cy.step('verify "Login to view price and buy" button')
        laminateFinderPage.verifyLoginToViewPriceButtonEdge()

        cy.step('click "Login to view price and buy" button')
        laminateFinderPage.clickLoginToViewPriceButtonEdge()
        cy.verifySignInPopupDisplayed()

        cy.step('Once user is logged in the user should be redirected to the main Laminate Finder page')
        //cy.login();
        cy.setCredentials(Cypress.env("username"), Cypress.env("password"));
        cy.clickOnButton("SIGN IN");
        cy.verifySignInPopupDisplayed()
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()
        laminateFinderPage.verifyNavigateToLaminateFinderPage()
        

        

    })



    } )
