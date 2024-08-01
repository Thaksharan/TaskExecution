//import selectors from '../../support/selectors.js';
import LaminateFinderPage from "../../PageObjects/LaminateFinderPage";


    describe('Laminate Finder Tests',() =>{
    const laminateFinderPage=new LaminateFinderPage()

    before(()=>{
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickOnMainNavTab('Laminate Finder')
        cy.verifyCountrySelectorPopupDisplayed()
        cy.enterCountryInCountrySelectorPopup("SL")
        cy.clickContinuInCountrySelectorPopup()
        laminateFinderPage.verifyNavigateToLaminateFinderPage()
        laminateFinderPage.verifyLaminateListLoaded()
    } ) 

    it('WLC-TC-368 [Logged Out] Verify County Indicator in Logged Out State' , () =>{

        cy.step('Click on Edit on the County Indicator')
        laminateFinderPage.clickCountryIndicator()
        cy.verifyCountrySelectorPopup()

        cy.step('Fill the county selector pop-up with new different details')
        cy.enterCountryInCountrySelectorPopup("UK")
        cy.enterStateCodeInCountrySelectorPopup("JK")
        cy.enterCountyNameInCountrySelectorPopup("England")
        cy.clickContinuInCountrySelectorPopup()
        //wait for page reload
        laminateFinderPage.verifyLaminateListLoaded()
        laminateFinderPage.verifyCountryIndicatorText('England','JK','UK')

        cy.step('Click on Edit on the County Indicator')
        laminateFinderPage.clickCountryIndicator()
        cy.verifyCountrySelectorPopup()

        cy.step('Select "all regions" in county selector')
        laminateFinderPage.selectAllRegions()
        cy.clickContinuInCountrySelectorPopup()
        laminateFinderPage.verifyLaminateListLoaded()
        laminateFinderPage.verifyNotAvailbleInTerriorityMsgNotDisplayed()

        cy.step('Click on Edit on the County Indicator')
        laminateFinderPage.clickCountryIndicator()
        cy.verifyCountrySelectorPopup()

        //skipping this step due currently this cannot reproduce
        // cy.step('Verify Disclaimer message displayed for the laminates based on the region')
        // //this happens for only few regions -so verifying for selected acenario below
        // cy.enterCountryInCountrySelectorPopup("US")
        // cy.enterStateCodeInCountrySelectorPopup("CA")
        // cy.clickContinuInCountrySelectorPopup()
        // laminateFinderPage.checkFilterUnderAttributeFIlter('Brands',1,'Formica')
        // laminateFinderPage.verifyLaminateListLoaded()
        // //cy.wait(8000)
        // laminateFinderPage.verifyNotAvailbleInTerriorityMsg()
        
        

        
        
        

        

        
                
    })



    } )
