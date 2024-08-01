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

    it('WLC-TC-380 [Logged Out] Verify Reset Button' , () =>{

        cy.step('Select a color on the Color Picker/Selector')
        laminateFinderPage.clickColorOnColorPicker()

        cy.step('Type the Color Name/Color Code in Search bar')
        laminateFinderPage.searchLaminates('3037')
        laminateFinderPage.verifySearchByColorCode('3037')

        cy.step(' Click on the Reset all button')
        laminateFinderPage.clickResetAllLink()
        laminateFinderPage.verifyResetSuccessfully()

        
        
        

        

        
                
    })



    } )
