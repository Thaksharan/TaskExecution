import selectors from '../../support/selectors.js';
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';
import ShippingPaymentPage from '../../PageObjects/ShippingPaymentPage.js';

describe('Shopping Cart Tests',() =>{
    const shoppingcartpage=new ShoppingCartPage();
    const shippingPaymentPage=new ShippingPaymentPage()

    //Access data through hooks for multiple it blocks
    let product_test_data1
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/product_SE901.json').then((data)=>{
       product_test_data1=data
      })
    })

    beforeEach(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.step('data clear action::item deleted from cart')
        cy.clickViewCartOnHeader();
        cy.verifyLabel("h1","Shopping Cart");
        //cy.wait(5000)
        shoppingcartpage.clearAllItemsOnCart()
        cy.log('data clear action::item deleted from cart')

        cy.step('data clear action:: clear Applied PromoCode')
        shoppingcartpage.clearAppliedPromoCode()
    } ) 
    
    beforeEach(() =>{
        cy.step('add 2 items to cart using quick order form')
        cy.clickQuickOrder()
        cy.enterItemInQuickOrderDialog('1',product_test_data1.item_id)
        cy.enterItemQuantityInQuickOrderDialog('1','1')
        cy.enterItemInQuickOrderDialog('2','WNSSF8081')
        cy.enterItemQuantityInQuickOrderDialog('2','1')
        cy.clickValidateBtnOnQuickOrder();
        cy.clickAddToCartBtnOnQuickOrder()
        shoppingcartpage.verifyNavigateToShoppingCartPage()
    })
    
    it('WLC-TC-404 & 549 & 552 Verify the Shopping cart Functionalities' , () =>{

        cy.step('TC-549- select a Shipping Option from the dropdown')
        shoppingcartpage.clickChangeShippingOptions(product_test_data1.item_id)
        cy.selectDropdownByIndex(selectors.drpBackordered,2);

        cy.step('TC 549-User should be able to view details of the product stock availability ')
        //stock availbilty status
        shoppingcartpage.verifyStockLocationSameDayShipping()

        cy.step('TC-552 - Select Same day shipping option from Cart page top drop down')
        shoppingcartpage.selectChangeShippingMethodTop('Same Day Shipping (if ordered before 12:00 Noon)')

         cy.step('Click on delete icon infront of the Product')
         shoppingcartpage.clickOnDeleteItem(product_test_data1.item_id)
         cy.verifyLabel('p',"Are you sure you want to remove this item from cart?")
         cy.step('Click "Cancel"')
         cy.clickOnButton('CANCEL')
         shoppingcartpage.clickOnDeleteItem(product_test_data1.item_id)
         cy.step('Click "Confirm"')
         cy.clickOnButton('CONFIRM');
         cy.wait(5000)

        //get total of cart before applying promo to redeemable product
        // let cart= shoppingcartpage.getTotalOfCart();
        // cy.log(cart)
        cy.step('Add a promo code')
        shoppingcartpage.redeemPromoCode('LP1025')

         //Add a promo code to the text field
        //cy.enterValue(selectors.promocode,'BARPULLS')
        //cy.enterValue(selectors.promocode,'LP1025')

        cy.step('Click on close Redeem Button')
        shoppingcartpage.closeAppliedPromoCode()

        cy.step('Add PO No and Job name (TOP)')
        shoppingcartpage.typePONumber('1')
        shoppingcartpage.typeJobName('test')

        cy.step('click continue button- User should be navigated to the shipping and payment page')
        cy.clickOnButton('CONTINUE')
        cy.wait(3000)
        cy.step('click Back Btn')
        shippingPaymentPage.clickBackBtn()
        //cy.clickOnButton(selectors.btnBack)
        cy.wait(3000)

        cy.step('Click on the Delete icon next to the Subtotal')
        cy.get(selectors.btnClearCart,{timeout:15000}).click()
        
        cy.step('Click on cancel')
        cy.clickOnButton('CANCEL')

        cy.step('Click on confirm')
        shoppingcartpage.clearAllItemsOnCart()

    })

})
