//import selectors from '../../support/selectors.js';
import LaminateFinderPage from "../../PageObjects/LaminateFinderPage";

    describe('Laminate Finder Tests',() =>{
    const laminateFinderPage=new LaminateFinderPage()

    before(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()
        cy.clickOnMainNavTab('Laminate Finder')
        laminateFinderPage.verifyNavigateToLaminateFinderPage()
        laminateFinderPage.verifyLaminateListLoaded()
    } ) 

    it('WLC-TC-374 [Login] Verify the Price and availability popup Sections', () =>{

        cy.step('Click on one product from the laminate finder page')
        laminateFinderPage.clickLaminateTile()

        cy.step('verify Price and availability popup')
        laminateFinderPage.verifyPriceAvailabilityPopupDisplayed()
        laminateFinderPage.verifyPriceAvailabilityPopup()

        cy.step('verify enlarged color view of the availability popup')
        laminateFinderPage.verifyColorZoomInPopup()

        cy.step('click close icon on Price and availability popup')
        laminateFinderPage.closePriceAvailabilityPopup()
    })



    } )
