import MyOrdersPage from "../../PageObjects/MyOrdersPage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";
import selectors from "../../support/selectors";

describe('My Orders Tests',()=>{
    const myOrders= new MyOrdersPage()
    const shoppingcartpage=new ShoppingCartPage()

    before(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.clickViewCartOnHeader();
        cy.verifyLabel("h1","Shopping Cart");
        shoppingcartpage.clearAllItemsOnCart()
        cy.log('data clear action::item deleted from cart')
    })

    it('WLC-TC-400 & 564 Verify Add to Cart Items Using My Orders',()=>{
        cy.clickOnMainNavTab('My Orders')
        myOrders.verifyMyOrderPageHeader()

        //added this step for 90days due to if latest orders not available in system test fail
        cy.step('add duration from dropdown')
        myOrders.setDuration('90 days')
        myOrders.clickSearchOrderButton()

        cy.step('Click on a displayed Order')
        myOrders.clickAOrderInTable()
        myOrders.verifyBackMyOrdersButton()

        cy.step('Click on Buy Again under a product item displayed')
        myOrders.clickBuyAgainButton()
        myOrders.verifyAddToCartDialog()

        //user can enter invalid char to input box-inform qa
        cy.step('Add a valid quantity to a product')
        myOrders.enterItemQuantityInAddToCartDialog('1')

        cy.step('Click Add to cart')
        myOrders.clickAddToCartOnDialog()

        cy.step('Click on the Shopping cart icon')
        cy.clickViewCartOnHeader();

        cy.step('TC-564- select a Shipping Option from the dropdown')
        //cy.wait(4000)
        shoppingcartpage.clickChangeShippingOptionsWithoutID()

        cy.step('TC-564- If its In Stock “Same Day Shipping (if ordered before 12:00 Noon)“ option should be available for eligible users(Brea, CA users) by default.')
        shoppingcartpage.verifyStockLocationSameDayShipping()

        cy.step('update the Quantity of added Product')
        shoppingcartpage.typeQuantityOfItem('2')
        //cy.wait(2000)
        //shoppingcartpage.verifySubTotalWhenQuantityChange(14.14,2)

        


        
    })
})