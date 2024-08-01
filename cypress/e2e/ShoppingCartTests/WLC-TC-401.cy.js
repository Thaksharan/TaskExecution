import selectors from '../../support/selectors.js';
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";


    describe('Shopping Cart Tests',() =>{
    const shoppingcartpage=new ShoppingCartPage(); 

    //Access data through hooks for multiple it blocks
    let product_test_data
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/product_SE901.json').then((data)=>{
       product_test_data=data
      })
    })

    beforeEach(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()
        cy.log('Login to the system successfully');

        cy.step('data clear action::item delete from cart')
        cy.clickViewCartOnHeader();
        cy.verifyLabel("h1","Shopping Cart");
        shoppingcartpage.clearAllItemsOnCart()
        

    } ) 

    it('WLC-TC-401 Verify Add to Cart Using Quick Order Form' , () =>{

        cy.clickQuickOrder()
        cy.step('quick order dialog is visible')
        cy.verifyQuickOrderDialogDisplayed()

        //Click on item sku Text box and add a valid SKU
        //Click on Quantity Text box and add a quantity
        
        cy.step('enter valid SKUs')
        cy.enterItemInQuickOrderDialog('1',product_test_data.item_id)
        cy.enterItemQuantityInQuickOrderDialog('1','1')

        cy.step('enter invalid SKUs')
        cy.enterItemInQuickOrderDialog('2','SE')
        cy.enterItemQuantityInQuickOrderDialog('2','1')

        cy.step('click validate button')
        cy.clickValidateBtnOnQuickOrder()

        cy.step('Valid SKUs and invalid SKUs should display to the user on the status field')
        cy.step('SKU is valid it should show the *✓* mark')
        cy.verifyTextValue(selectors.validateTick)

        cy.step('SKU is invalid it should show "invalid SKU" message in front of the product')
        cy.verifyTextValue(selectors.InvalidSKUMsg)
        cy.verifyLabel('div', 'Invalid SKU')

        cy.step('Select an invalid SKU (put the tick in front of the invalid SKU)')
        cy.clickOnButtonByXpath(selectors.checkbox2)

        cy.step('Click on Delete (at the top of the form)')
        cy.clickOnButtonByXpath(selectors.btnDelete)

        cy.step('Again click the validate button-Button text should change to "Add to cart"')
        cy.clickValidateBtnOnQuickOrder()
        //cy.wait(5000)
        cy.verifyAddToCartBtnOnQuickOrder()

        cy.step('Click Add to cart Button')
        cy.clickAddToCartBtnOnQuickOrder()
        //cy.wait(5000)

        cy.step('Add the quantity to a item from the cart page which was added from the Quick order pad')
        shoppingcartpage.verifyQuantityOfItem('1')
        cy.verifyLinkInDOM('Item#: '+product_test_data.item_id,product_test_data.item_link)
        cy.verifyLabel('span', product_test_data.item_price)
        shoppingcartpage.verifySubTotalWhenQuantityChange(product_test_data.item_price,1)

        cy.step('increase quntity-see the change of the price of the item in cart page and the total amount.')
        shoppingcartpage.typeQuantityOfItem('2')
        shoppingcartpage.verifySubTotalWhenQuantityChange(product_test_data.item_price,2)
    })

    } )
