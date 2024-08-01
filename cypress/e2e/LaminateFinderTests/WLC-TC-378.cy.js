//import selectors from '../../support/selectors.js';
import LaminateFinderPage from "../../PageObjects/LaminateFinderPage";
import ProductPage from "../../PageObjects/ProductPage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";

    describe('Laminate Finder Tests',() =>{
    const laminateFinderPage=new LaminateFinderPage()
    const shoppingcartpage=new ShoppingCartPage(); 
    const productpage=new ProductPage()

    //Access data through hooks for multiple it blocks
    let product_test_data
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") + '/product_SE901.json').then((data)=>{
       product_test_data=data
      })
    })

    beforeEach(()=>{

        // cy.request({
        //     method:'DELETE',
        //     url:'/api/pim/webservice/ecommerce/cart'
        // })
        
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.clickViewCartOnHeader();
        cy.verifyLabel("h1","Shopping Cart");
        shoppingcartpage.clearAllItemsOnCart()
        cy.log('data clear action::item deleted from cart')

        
    } ) 

    it('WLC-TC-378 [Login] Verify the laminate products with Existing shopping cart' , () =>{

        cy.step('Add products to cart (not in laminate)')
        //add items using quick order dialog
        cy.clickQuickOrder()
        cy.enterItemInQuickOrderDialog('1',product_test_data.item_id)
        cy.enterItemQuantityInQuickOrderDialog('1','1')
        cy.clickValidateBtnOnQuickOrder();
        cy.clickAddToCartBtnOnQuickOrder()

        cy.section('Go to laminate finder page and add products to cart')
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
        cy.step('click Add to cart button')
        laminateFinderPage.clickAddToCartBtn()
        //auto redirect to shopping cart page when click add to cart
        cy.step('verify Products which have a Quantity should be added to the shopping cart')
        shoppingcartpage.verifyShoppingCartTableIsLoaded()
        shoppingcartpage.verifyItemIncart('101 Black')
        shoppingcartpage.verifyQuantityOfItem('1')

        cy.step('The existing not laminate items should not be removed from shopping cart')
        shoppingcartpage.verifyItemInCartByItemID(product_test_data.item_id)

        cy.step('Update the quantity of a laminate product from shopping cart')
        //select by partial txt
        shoppingcartpage.typeQuantityOfItemByItemID("BLACK",2)

        cy.step('Delete a laminate product from shopping cart')
        //since we are selecting random product passing partial text of color to ifentify the laminate
        shoppingcartpage.clickOnDeleteItem("BLACK")
        cy.verifyLabel('p',"Are you sure you want to remove this item from cart?")
        
        cy.step('Click cancel on delete popup')
        cy.clickOnButton('CANCEL')

        cy.step('Click confirm on delete popup')
        shoppingcartpage.clickOnDeleteItem("BLACK")
        cy.clickOnButton('CONFIRM');
        shoppingcartpage.verifyItemDeleted("BLACK")

    })



    } )
