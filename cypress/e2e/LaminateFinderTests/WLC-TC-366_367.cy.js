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

    it('WLC-TC-366_367 [Logged Out] Verify Search Laminate Item by Attribute Filters and Color Picker/Selector' , () =>{

        cy.step('click and verify attribute filters')
        laminateFinderPage.clickAttributeFilter('Brands',1)
        laminateFinderPage.clickAttributeFilter('Product Type',2)
        laminateFinderPage.clickAttributeFilter('Color Name',3)
        laminateFinderPage.clickAttributeFilter('Color Number',4)
        laminateFinderPage.clickAttributeFilter('Color Type',5)
        laminateFinderPage.clickAttributeFilter('Finish',6)
        laminateFinderPage.clickAttributeFilter('Grade',7)
        laminateFinderPage.clickAttributeFilter('Thickness',8)
        laminateFinderPage.clickAttributeFilter('Width',9)
        laminateFinderPage.clickAttributeFilter('Length',10)

        cy.step('Click on one/many of the filters under attributes')
        laminateFinderPage.checkFilterUnderAttributeFIlter('Brands',1,'909 Surfaces')
        laminateFinderPage.checkFilterUnderAttributeFIlter('Product Type',2,'Laminate')
        laminateFinderPage.checkFilterUnderAttributeFIlter('Color Name',3,'Black')

        cy.step('Type the Color Name/Color Code in Search bar')
        laminateFinderPage.searchLaminates('109')
        cy.wait(3000)
        laminateFinderPage.verifySearchByColorCode('109')

        cy.step('Select a color on the Color Picker/Selector')
        laminateFinderPage.clickColorOnColorPicker()

        cy.step('Click on the collapse arrow buttons on the Color Picker/Selector')
        laminateFinderPage.collapseColorPicker(0)

        
        
        

        

        
                
    })



    } )
