//import selectors from '../../support/selectors.js';
import LaminateFinderPage from "../../PageObjects/LaminateFinderPage";

    describe('Laminate Finder Tests',() =>{
    const laminateFinderPage=new LaminateFinderPage()

    before(()=>{
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickOnMainNavTab('Laminate Finder')
        cy.verifyCountrySelectorPopupDisplayed()
        cy.enterCountryInCountrySelectorPopup("US")
        cy.clickContinuInCountrySelectorPopup()
        laminateFinderPage.verifyNavigateToLaminateFinderPage()
        laminateFinderPage.verifyLaminateListLoaded()
    } ) 

    it('WLC-TC-379 [Logged out]] Verify the Price and availability popup UI', () =>{

        cy.step('Click on one product from the laminate finder page')
        laminateFinderPage.clickLaminateTile()

        cy.step('verify Price and availability popup')
        laminateFinderPage.verifyPriceAvailabilityPopupDisplayed()
        laminateFinderPage.verifyPriceAvailabilityPopup()

        cy.step('verify enlarged color view of the availability popup')
        laminateFinderPage.verifyColorZoomInPopup()

        // cy.step('click close icon on Price and availability popup')
        // laminateFinderPage.closePriceAvailabilityPopup()

        cy.step('verify "Login to view price and buy" button')
        laminateFinderPage.verifyLoginToViewPriceButton()

        cy.step('click "Login to view price and buy" button')
        laminateFinderPage.clickLoginToViewPriceButton()
        cy.verifySignInPopupDisplayed()
    })



    } )
