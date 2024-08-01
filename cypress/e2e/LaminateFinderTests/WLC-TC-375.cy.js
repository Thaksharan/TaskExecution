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

    it('WLC-TC-375 [Login] Verify the attribute filter in the POPUP' , () =>{

        cy.step('Type laminate that has grade and finish in the search bar')
        laminateFinderPage.searchLaminates('101 Black')
        laminateFinderPage.verifySearchByColorCodeAndName('Black','101')

        cy.step('Click on searched product from the laminate finder page')
        laminateFinderPage.clickLaminateTile()

        cy.step('verify Price and availability popup')
        laminateFinderPage.verifyPriceAvailabilityPopupDisplayed()

        cy.step('Select one grade option')
        laminateFinderPage.selectGrade('Horizontal Postforming')

        cy.step('Select one finish value')
        laminateFinderPage.selectFinish('Ashwood')

        cy.step('Change the Grade selected value')
        laminateFinderPage.selectGrade('Vertical Postforming')

    })



    } )
