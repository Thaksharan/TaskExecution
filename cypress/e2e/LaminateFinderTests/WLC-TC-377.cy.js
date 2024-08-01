//import selectors from '../../support/selectors.js';
import LaminateFinderPage from "../../PageObjects/LaminateFinderPage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";

    describe('Laminate Finder Tests',() =>{
    const laminateFinderPage=new LaminateFinderPage()
    const shoppingcartpage=new ShoppingCartPage(); 

    before(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.clickViewCartOnHeader();
        cy.verifyLabel("h1","Shopping Cart");
        shoppingcartpage.clearAllItemsOnCart()
        cy.log('data clear action::item deleted from cart')

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
        cy.step('Select one grade option and finish combination which has items')
        laminateFinderPage.selectGrade('Horizontal Postforming')
        laminateFinderPage.selectFinish('Ashwood')
        cy.step('Add Quantity')
        laminateFinderPage.typeQuantityForSize(1)
    } ) 

    it('WLC-TC-377 [Login] Verify add to cart feature (Quantity/ shipping options, price calculation)' , () =>{

        cy.step('verify Add to cart button enabled')
        laminateFinderPage.verifyAddToCartButtonAvailable()

        cy.step('click Add to cart button')
        laminateFinderPage.clickAddToCartBtn()

        // cy.step('Go to shopping cart')
        // cy.clickViewCartOnHeader()

        //auto redirect to shopping cart page when click add to cart
        cy.step('verify Products which have a Quantity should be added to the shopping cart')
        shoppingcartpage.verifyShoppingCartTableIsLoaded()
        shoppingcartpage.verifyItemIncart('101 Black')
        shoppingcartpage.verifyQuantityOfItem('1')
        

    })



    } )
