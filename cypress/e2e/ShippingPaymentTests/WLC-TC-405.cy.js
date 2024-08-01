//import selectors from '../../support/selectors.js';
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";
import ShippingPaymentPage from '../../PageObjects/ShippingPaymentPage.js';
import ManageUsersPage from "../../PageObjects/ManageUsersPage.js";


    describe('Shipping Payement Tests',() =>{
    const shoppingcartpage=new ShoppingCartPage(); 
    const shippingPaymentPage=new ShippingPaymentPage()
    const manageUsers= new ManageUsersPage()

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

        // cy.clickViewCartOnHeader();
        // cy.verifyLabel("h1","Shopping Cart");
        // shoppingcartpage.clearAllItemsOnCart()
        // cy.log('data clear action::item deleted from cart')

        //add items using quick order dialog
        cy.clickQuickOrder()
        cy.enterItemInQuickOrderDialog('1',product_test_data.item_id)
        cy.enterItemQuantityInQuickOrderDialog('1','1')
        cy.clickValidateBtnOnQuickOrder();
        cy.clickAddToCartBtnOnQuickOrder()

        //click continue button- User should be navigated to the shipping and payment pageUser should be navigated to the shipping and payment page
        cy.clickOnButton('CONTINUE')
        cy.wait(3000)

    } ) 

    it('WLC-TC-405 Verify the Shipping option functionalities' , () =>{

        cy.step('Click add new address')
        shippingPaymentPage.clickAddNewAddress()
        cy.verifyShippingAddressdialog()
        cy.typeDetailsOnShippingDialog('Test8','TestAuto123 street,South','California','AL','11010','022-111-1111')
        cy.clickDoneOnShippingDialog()

        cy.step('Click on select another address option')
        shippingPaymentPage.clickSelectAnotherAddress()
        shippingPaymentPage.verifySelectAnotherAddrespopup()
        //Select new address added in this tc
        shippingPaymentPage.clickAddressInPopup(shipping_test_data.default_shipping_address)
        shippingPaymentPage.clickConfirmBtnInPopup()
        //cy.wait(5000)
        shippingPaymentPage.verifySelectedAddressDisplayed(shipping_test_data.default_shipping_address)

        cy.step('Add Email confirmation')
        //shippingPaymentPage.verifyDefaultEmailAddressInField('rifka@villvay.com')
        shippingPaymentPage.typeEmailAddressInField('testAutomation@villvay.com')

        //find how value get for attun,friver note
        cy.step('Add Attn')
        shippingPaymentPage.typeAttnInField('testAuto')

        cy.step('Add Driver Note')
        shippingPaymentPage.typeDriverNotesInField('test')

        //cy.step('Click on calendar (add future ship date)')
    })

    after(()=>{
        cy.step('data deletion step - delete created new address')
        cy.clickOnMainNavTab('User Management')
        manageUsers.verifyManageUsersPageHeader()
        manageUsers.clickPersonalNavigationTab()
        manageUsers.clickManageAddressBtn()
        manageUsers.clickDeleteAddress('TestAuto123 street,South')
    })
    
    } )
