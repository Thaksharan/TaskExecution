import HomePage from "../../PageObjects/HomePage";
import MyPurchasedItemsPage from "../../PageObjects/MyPurchasedItemsPage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";
import selectors from '../../support/selectors.js';

describe('My Purchased Items Tests', () => {
    const homepage = new HomePage();
    const myPurchasedItems=new MyPurchasedItemsPage()
    const shoppingcartpage=new ShoppingCartPage(); 

    beforeEach(() => {
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.clickViewCartOnHeader();
        cy.verifyLabel("h1","Shopping Cart");
        //cy.wait(5000)
        shoppingcartpage.clearAllItemsOnCart()
        cy.log('data clear action::item deleted from cart')
    })
    
    it('WLC-TC-398 & 548 Verify Add to Cart Items Using My Purchased Items', () => {
        cy.clickOnMainNavTab('Purchased Items')
        myPurchasedItems.verifyMyPurchasedItemsPageHeader()

        cy.step('Add a invalid quantity to a product')
        // myPurchasedItems.enterQuantity("MA990-1/4","0")
        // myPurchasedItems.enterQuantity("MA990-1/4","A")
        // myPurchasedItems.enterQuantity("MA990-1/4","&*")
        // myPurchasedItems.verifyQuantityValue("MA990-1/4",'')
        myPurchasedItems.enterQuantityWithoutID(0,"0")
        myPurchasedItems.enterQuantityWithoutID(0,"A")
        myPurchasedItems.enterQuantityWithoutID(0,"&*")
        myPurchasedItems.verifyQuantityValueWithoutID(0,'')

        cy.step('Add a valid quantity to a product')
        // myPurchasedItems.enterQuantity("MA990-1/4","5")
        // myPurchasedItems.verifyQuantityValue("MA990-1/4",'5')
        // myPurchasedItems.enterQuantityWithoutID(0,minQty)
        //valid qty should be multiple of min qty
        myPurchasedItems.typeMinQtyOfItem(0)

        cy.step('Add to cart button should enable once user added a quantity')
       // myPurchasedItems.verifyAddToCartIsEnabled("MA990-1/4");
       myPurchasedItems.verifyAddToCartEnabledWithoutID(0)

        cy.step('TC-548- select a Shipping Option from the dropdown')
        //myPurchasedItems.clickChangeShippingOptions("MA990-1/4","CHANGE SHIPPING OPTIONS")
        myPurchasedItems.clickChangeShippingOptionsWithoutID(0)
        myPurchasedItems.selectShippingOptionVariation('Truck')
        //cy.selectDropdownByIndex(selectors.drpBackordered,2);

        cy.step('TC 548-User should be able to view details of the product stock availability ')
        //stock availbilty status
        myPurchasedItems.getStockAvailabilityStatus()

        cy.step('Click Add to cart button')
        //myPurchasedItems.clickAddToCart("MA990-1/4")
        myPurchasedItems.clickAddToCartWithoutID(0)

        cy.step('Verify Add to Cart Popup')
        cy.verifyViewCartOnPopup()
        cy.clickViewCartOnPopup();

        cy.step('Go to the shopping cart and update the Quantity of added Product')
        cy.verifyLabel("h1","Shopping Cart");
        //update the Quantity of added Product
        //shoppingcartpage.typeQuantityOfItem('10')
        shoppingcartpage.updateQuantityToMultipleOfMinQty(2)
        //shoppingcartpage.verifySubTotalWhenQuantityChangeTest(10)
        //cy.wait(5000)
        shoppingcartpage.verifySubTotalWhenQuantityChange2()
      


        
        
    })

    // after(() => {
    //     // cy.on('uncaught:exception', (err, runnable) => {
    //     //     return false
    //     // })
    //     // cy.wait(8000);   
    //     // cy.selectItem('View Account & History');
    //     // cy.selectItem('Logout');
    //     // cy.log('Logged out from the system');

    // })

})


