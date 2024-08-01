//import selectors from '../../support/selectors.js';
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";
import ShippingPaymentPage from '../../PageObjects/ShippingPaymentPage.js';


    describe('Shipping Payement Tests',() =>{
    const shoppingcartpage=new ShoppingCartPage(); 
    const shippingPaymentPage=new ShippingPaymentPage()

    //Access data through hooks for multiple it blocks
    let product_test_data
    let test_credit_card
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/product_SE901.json').then((data)=>{
       product_test_data=data
      })

      cy.fixture(Cypress.env("fixtureFolder") +'/credit_card_data.json').then((data)=>{
        test_credit_card=data
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

    it('WLC-TC-406 Verify the Payment option functionalities' , () =>{
        cy.section('Click on Add new credit card option')
        shippingPaymentPage.clickAddNewCard()

        cy.step('Fill the Credit card details')
        shippingPaymentPage.fillCreditCardName(test_credit_card.credit_card_name)
        shippingPaymentPage.fillCreditCardNumber(test_credit_card.credit_card_number)
        shippingPaymentPage.fillCreditCardExpiryDate(test_credit_card.credit_card_expiry)
        cy.step('user checked the save for future use option')
        shippingPaymentPage.checkSaveForFutureOptionOnCardPopup()
        cy.step('Click confirm button to save the card')
        shippingPaymentPage.clickSubmitButtonOnCardPopup()
        shippingPaymentPage.verifyAddedCardDisplayed(test_credit_card.credit_card_name)

        cy.section('verify card details display in the shipping and payment page(even user logged out and login)')
        cy.logout()
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()
        //due to random website reload placing a wait
        cy.wait(8000)
        cy.clickViewCartOnHeader();
        shoppingcartpage.verifyNavigateToShoppingCartPage()
        cy.clickOnButton('CONTINUE')
        cy.wait(3000)
        shippingPaymentPage.verifyAddedCardDisplayed(test_credit_card.credit_card_name)

        cy.section("Click delete icon on card")
        shippingPaymentPage.clickDeleteCard(test_credit_card.credit_card_name)
        shippingPaymentPage.verifyDeleteCardPopup()
        cy.step("Click Cancel Delete")
        shippingPaymentPage.clickCancelOnDeleteCard()
        shippingPaymentPage.verifyAddedCardDisplayed(test_credit_card.credit_card_name)

        cy.step("Click delete icon on card")
        shippingPaymentPage.clickDeleteCard(test_credit_card.credit_card_name)
        shippingPaymentPage.verifyDeleteCardPopup()
        cy.step("Click Confirm Delete")
        shippingPaymentPage.clickConfirmOnDeleteCard()
        shippingPaymentPage.verifyCardNotDisplayed(test_credit_card.credit_card_name)

        //this method will sometimes not show
       // this is for user update. you can update payment term via customer master upload or through PIM admin panel 
       //also can update it will sync with AM
        cy.section('Click Bill now option as payment method')
        shippingPaymentPage.selectBillNowPaymentOption()
        cy.section('Click Continue Order Button')
        shippingPaymentPage.clickContinueOrderButton()
        //cy.wait(5000)



        
        
    })



    } )
