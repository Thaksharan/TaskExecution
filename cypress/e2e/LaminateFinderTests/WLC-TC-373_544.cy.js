//import selectors from '../../support/selectors.js';
import LaminateFinderPage from "../../PageObjects/LaminateFinderPage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";

    describe('Laminate Finder Tests',() =>{
    const laminateFinderPage=new LaminateFinderPage()
    const shoppingcartpage=new ShoppingCartPage()

    before(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.step('data clear action::item deleted from cart')
        cy.clickViewCartOnHeader();
        cy.verifyLabel("h1","Shopping Cart");
        shoppingcartpage.clearAllItemsOnCart()

        cy.clickOnMainNavTab('Laminate Finder')
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

    it('WLC-TC-373 [Login] Verify List of Matching Edgebander(s) in Logged In State' , () =>{

        //check tc
        cy.step('verify Matching Edgebanding Available for selected product')
        laminateFinderPage.verifyMatchingEdgebandingAvailable()

        cy.step('Click on the expand arrows of a matching edgeband')
        laminateFinderPage.clickMatchingEdgeBand()

        cy.step('verify details of the matching edge band')
        laminateFinderPage.verifyMatchingEdgeBandView()
        laminateFinderPage.verifyMatchingEdgeBandItemPriceQty()

        cy.step('Click on Price Breakdown')
        laminateFinderPage.clickPriceBreakDownEdge()
        laminateFinderPage.verifyPriceBreakDownEdge()

        cy.step('verify Add to Cart button disabled without entering a Quantity in the Qty field')
        laminateFinderPage.verifyAddTocartDisableEdge()

        cy.step('verify Shipping/ Stock Avail disabled without entering a Quantity in the Qty field')
        laminateFinderPage.verifyStockAvailabilityDisableEdge()

        cy.step('Enter a quantity in the Qty field')
        laminateFinderPage.typeQuantityEdge(1)

        cy.step('Click on Shipping/Stock Avail')
        laminateFinderPage.clickStockAvailabilityEdge()

        cy.step('TC 544-User should be able to view details of the product stock availability  and shipping options ')
        laminateFinderPage.verifyStockLocationSameDayShipping()

        cy.step('Click on Will Call Anywhere on Edge')
        laminateFinderPage.checkWillCallAnyWhere()

        cy.step('Select a will call location on Edge')
        laminateFinderPage.selectWillCallLocation('Boise, ID')

        cy.step('Click on Uncheck to return to home branch shipping options on Edge')
        laminateFinderPage.uncheckSelectedBranch()

        cy.step('Click on Add to Cart button on Edge')
        laminateFinderPage.clickAddToCartEdge()

        cy.step('User should be navigated to the Shopping Cart page')
        shoppingcartpage.verifyNavigateToShoppingCartPage()
        shoppingcartpage.verifyShoppingCartTableIsLoaded()

        cy.step('Item should be displayed added to the Shopping Cart Page')
        shoppingcartpage.verifyItemIncart('Black')

        

    })



    } )
