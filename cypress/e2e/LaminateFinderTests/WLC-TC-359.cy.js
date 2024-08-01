//import selectors from '../../support/selectors.js';
import LaminateFinderPage from "../../PageObjects/LaminateFinderPage";


    describe('Laminate Finder Tests',() =>{
    const laminateFinderPage=new LaminateFinderPage()

    before(()=>{
        cy.visit('/')
        cy.closeAdvertisementPopup()
    } ) 

    it('WLC-TC-359 [Logged Out]Verify Laminate Finder Page Load View' , () =>{

        cy.clickOnMainNavTab('Laminate Finder')
        laminateFinderPage.verifyNavigateToLaminateFinderPage()
        //County selector popup should display to the user
        cy.verifyCountrySelectorPopupDisplayed()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()

        cy.step('verify laminate list is loaded')
        laminateFinderPage.verifyLaminateListLoaded()

        cy.step('click Laminate Tile')
        laminateFinderPage.clickLaminateTile()

        cy.step('Price & availability pop-up should open')
        laminateFinderPage.verifyPriceAvailabilityPopupDisplayed()
        laminateFinderPage.verifyLoginToBuyInPopup()
        laminateFinderPage.closePriceAvailabilityPopup()

        cy.step('select value from "Per Page" dropdown')
        laminateFinderPage.selectItemsPerPage('40')
        laminateFinderPage.verifyItemsPerPage(40)

        cy.step('Click on a page number on pagination')
        laminateFinderPage.clickPageNoOnPagination('2')
        laminateFinderPage.verifyPageNoSelected(2)

        cy.step('Click on Back arrow')
        laminateFinderPage.clickOnBackArrowPagination()
        laminateFinderPage.verifyPageNoSelected(1)

        cy.step('Click on Next arrow')
        laminateFinderPage.clickOnNextArrowPagination()
        laminateFinderPage.verifyPageNoSelected(2)
        

        
                
    })



    } )
