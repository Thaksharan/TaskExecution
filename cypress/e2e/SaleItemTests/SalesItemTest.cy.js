///<reference types="Cypress"/>
import HomePage from "../../PageObjects/HomePage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";

describe('Sales Item Tests',()=>{
    const homepage = new HomePage();
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

        cy.clickOnMainNavTab('Home')
    })

    it('verify products with Sale tag functionalities',()=>{

        cy.step('Check products with Sale tags available on home page')
        homepage.clickFeatureTabSale()
        homepage.verifyFeaturedSaleProductsAvailable()

        cy.step('click products with Sale tags')
        homepage.verifyFeaturedSaleProductsAvailable()

        cy.step('Enter a quantity in the Qty field')
        homepage.typeQuantityBoxFeaturedProduct(0,"1")

        cy.step('Click on the Add to Cart button')
        homepage.clickAddToCartOnItemBlock(0)
        
        cy.verifyViewCartOnPopup()
        cy.clickViewCartOnPopup();
        shoppingcartpage.verifyNavigateToShoppingCartPage()

        shoppingcartpage.verifySubTotalFieldLoaded()

        cy.step('verify Discount Price Display In Cart')
        shoppingcartpage.verifyDiscountPriceDisplayInCart()

        /**
         * Should display the correct,

Sale price

Strikethrough original price

discount percent

for items with sale tag under Unit Price

Sale price should be less than the original price

Correct Subtotal and Total should be displayed based on the Sale price
         */



         
    })
})