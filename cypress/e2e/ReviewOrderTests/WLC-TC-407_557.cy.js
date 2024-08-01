//import selectors from '../../support/selectors.js';
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";
import ShippingPaymentPage from '../../PageObjects/ShippingPaymentPage.js';
import ReviewOrderPage from "../../PageObjects/ReviewOrderPage";


    describe('Review Order Tests',() =>{
    const shoppingcartpage=new ShoppingCartPage(); 
    const shippingPaymentPage=new ShippingPaymentPage()
    const reviewOrderPage=new ReviewOrderPage()
    let shippingMethodInCart;
    let reviewOrderPageMethod;

    //Access data through hooks for multiple it blocks
    let product_test_data
    let shipping_test_data
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/product_SE901.json').then((data)=>{
       product_test_data=data
      })

      cy.fixture(Cypress.env("fixtureFolder") +'/shipping_data.json').then((data)=>{
        shipping_test_data=data
       })

    })

    beforeEach(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()
        cy.log('Login to the system successfully');

        cy.clickViewCartOnHeader();
        cy.verifyLabel("h1","Shopping Cart");
        shoppingcartpage.clearAllItemsOnCart()
        cy.log('data clear action::item deleted from cart')

        //add items using quick order dialog
        cy.clickQuickOrder()
        cy.enterItemInQuickOrderDialog('1',product_test_data.item_id)
        cy.enterItemQuantityInQuickOrderDialog('1','1')
        cy.clickValidateBtnOnQuickOrder();
        cy.clickAddToCartBtnOnQuickOrder()

        //Add PO No and Job name (TOP)
        shoppingcartpage.typePONumber('1')
        shoppingcartpage.typeJobName('test')

        //check shipping method
        shippingMethodInCart =shoppingcartpage.getShippingMethodOfItem()

        //click continue button- User should be navigated to the shipping and payment pageUser should be navigated to the shipping and payment page
        cy.clickOnButton('CONTINUE')
        cy.wait(3000)

        shippingPaymentPage.typeEmailAddressInField('testAutomation@villvay.com')

        cy.step('Click on select another address option')
        shippingPaymentPage.clickSelectAnotherAddress()
        shippingPaymentPage.verifySelectAnotherAddrespopup()
        //Select new address added in this tc
        shippingPaymentPage.clickAddressInPopup(shipping_test_data.default_shipping_address)
        shippingPaymentPage.clickConfirmBtnInPopup()
        //cy.wait(5000)
        shippingPaymentPage.verifySelectedAddressDisplayed(shipping_test_data.default_shipping_address)

        shippingPaymentPage.selectBillNowPaymentOption()
        shippingPaymentPage.clickContinueOrderButton()

    } ) 

    it('WLC-TC-407 & 557 Verify the Review your Order Page' , () =>{
        
        //this method will sometimes not show
       // this is for user update. you can update payment term via customer master upload or through PIM admin panel 
       //also can update it will sync with AM
        cy.step('verify Payment Method')
        reviewOrderPage.verifyPaymentMethod("BILL NOW OPEN")

        cy.step('verify Shipping Address')
        reviewOrderPage.verifyShippingAddress(shipping_test_data.default_shipping_address)

        cy.step('verify Billing Address')
        reviewOrderPage.verifyBillingAddress(shipping_test_data.billing_address)

        cy.step('verify Job Name')
        reviewOrderPage.verifyJobName('test')

        cy.step('verify Po Number')
        reviewOrderPage.verifyPoNumber('1')

        cy.step('verify Order Confirmation Email')
        reviewOrderPage.verifyOrderConfirmationEmail('testAutomation@villvay.com')

        cy.step('verify Product Name')
        reviewOrderPage.verifyProductName(product_test_data.item_id)

        cy.step('verify Product Quantity')
        reviewOrderPage.verifyProductQuantity('1')

        cy.step('verify Order Summary')
        reviewOrderPage.verifyOrderSummary()
        reviewOrderPage.verifyCheckoutButton()  
        
        cy.step('tc 557 - verify shipping method on review order page')
        reviewOrderPageMethod= reviewOrderPage.getShippingMethodOfItem()
        //TO do- how can compare 2 values in cypress diffrent pages
        //reviewOrderPageMethod="Same Day Shipping (if ordered before 12:00 Noon)"
        //reviewOrderPage.verifyShippingMethodIsSameAsCart(shippingMethodInCart,reviewOrderPageMethod)
        // expect(shippingMethodInCart).to.equal(reviewOrderPageMethod)
        // cy.log(`shipping method is same on cart:${shippingMethodInCart} , review order page:${reviewOrderPageMethod}`)

    })



    } )
