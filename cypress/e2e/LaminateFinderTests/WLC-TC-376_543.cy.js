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

    it('WLC-TC-376 & 543 [Login] Verify the availability and Price update in Result' , () =>{

        cy.step('Type laminate that has grade and finish in the search bar')
        laminateFinderPage.searchLaminates('101 Black')
        laminateFinderPage.verifySearchByColorCodeAndName('Black','101')

        cy.step('Click on searched product from the laminate finder page')
        laminateFinderPage.clickLaminateTile()

        cy.step('verify Price and availability popup')
        laminateFinderPage.verifyPriceAvailabilityPopupDisplayed()

        cy.step('Select one grade option and finish combination which has items')
        laminateFinderPage.selectGrade('Horizontal Postforming')
        laminateFinderPage.selectFinish('Ashwood')

        cy.step('Add Quantity')
        laminateFinderPage.typeQuantityForSize(1)

        cy.step('verify shipping and availability option enabled')
        laminateFinderPage.verifyShippingOptionAvailable()

        cy.step('verify Add to cart button enabled')
        laminateFinderPage.verifyAddToCartButtonAvailable()

        cy.step('price should be calculated and should show inline')
        laminateFinderPage.verifyItemPriceIsUpdated()

        cy.step('All the product total should be display under the section')
        laminateFinderPage.verifyTotalPriceIsUpdated()

        cy.step('Click on an option in the Shipping Options dropdown')
        laminateFinderPage.clickShippingOption()
        laminateFinderPage.verifyShippingOptionDropDownDisplayed()
        laminateFinderPage.selectShippingOption('Truck')

        cy.step('TC 543-User should be able to view details of the product stock availability ')
        //stock availbilty status
        laminateFinderPage.getStockAvailabilityStatus()

        cy.step('Click on Will Call Anywhere')
        laminateFinderPage.checkWillCallAnyWhere()

        cy.step('Select a will call location')
        laminateFinderPage.selectWillCallLocation('Boise, ID')

        cy.step('Click on Uncheck to return to home branch shipping options')
        laminateFinderPage.uncheckSelectedBranch()
        laminateFinderPage.verifyShippingOptionDropDownDisplayed()

    })



    } )
