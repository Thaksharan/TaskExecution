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

    it('WLC-TC-365 [Logged Out] Verify Search Laminate Item by Search Key' , () =>{

        cy.step('search laminates by color name')
        laminateFinderPage.searchLaminates('Black')
        laminateFinderPage.verifyLaminateListLoaded()
        laminateFinderPage.verifySearchByColorName('Black')

        cy.step('search laminates by color code')
        laminateFinderPage.searchLaminates('3037')
        laminateFinderPage.verifySearchByColorCode('3037')

        cy.step('Type a combination of color name and color code separated by a space in the search bar')
        laminateFinderPage.searchLaminates('Black 3037')
        laminateFinderPage.verifySearchByColorCodeAndName('Black','3037')

        cy.step('Type only part of the color number or color name in the search bar')
        laminateFinderPage.searchLaminates('30')
        laminateFinderPage.verifySearchByColorCode('30')

        laminateFinderPage.searchLaminates('Bla')
        laminateFinderPage.verifySearchByColorName('Bla')

        cy.step('When no results are found for the given search')
        laminateFinderPage.searchLaminates('ye36362')
        laminateFinderPage.verifyNoResultsFoundMsg()          
    })

    } )