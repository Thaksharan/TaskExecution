import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";
import selectors from "../../support/selectors.js";

describe("Shopping Cart Tests", () => {
  const shoppingcartpage = new ShoppingCartPage();

  //Access data through hooks for multiple it blocks
  let product_test_data;
  before(() => {
    cy.fixture(Cypress.env("fixtureFolder") +"/product_SE901.json").then((data) => {
      product_test_data = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.setAccountShippingAddress();
    cy.verifySiteLoaded();

    cy.step("data clear action::item deleted from cart");
    cy.clickViewCartOnHeader();
    shoppingcartpage.clearAllItemsOnCart();
  });

  it("WLC-TC-402 Verify Add to Cart Using Large Order Pad", () => {
    // cy.on('uncaught:exception', (err, runnable) => {
    //     return false
    // })
    // .wait(5000)
    cy.clickViewCartOnHeader();
    shoppingcartpage.verifyShoppingCartPageHeader();

    cy.step("click UseLargeOrder Button");
    shoppingcartpage.clickUseLargeOrderButton();
    cy.verifyLabel("h1", "Large Order Pad");

    cy.step("Verify Large Order Pad");
    //verification of below 2 fields removed due to requirement change
    //.verifyLabel('div','Upload Orders')
    //cy.verifyLabel('h6','Help')
    cy.verifyButtonText("DELETE");
    cy.verifyButtonText("Validate");
    cy.verifyButtonText("CLEAR FORM");
    cy.verifyButtonText("Upload items list as excel/CSV file");

    cy.step("type Item id and qunatity");
    //cy.enterValue(selectors.quickOrderSku1,product_test_data.item_id)
    //cy.enterValue(selectors.quickOrderQty1,'1')
    shoppingcartpage.typeItemSKULargeOrderPad(1, product_test_data.item_id);
    shoppingcartpage.typeItemQuantityLargeOrderPad(1, 1);

    cy.step('clicks "Clear form" button All Form values should be cleared');
    cy.clickOnButton("CLEAR FORM");

    cy.step(
      "should not be able to insert zero values, letters or any special charters in quantity field"
    );
    // cy.enterValue(selectors.quickOrderQty1,'0')
    // cy.enterValue(selectors.quickOrderQty1,'A')
    // cy.enterValue(selectors.quickOrderQty1,'&*')
    // cy.verifySelectedValue(selectors.quickOrderQty1,'')
    shoppingcartpage.typeItemQuantityLargeOrderPad(1, 0);
    shoppingcartpage.typeItemQuantityLargeOrderPad(1, "A");
    shoppingcartpage.typeItemQuantityLargeOrderPad(1, "&*");
    shoppingcartpage.verifyItemQuantityLargeOrderPad(1, "");

    cy.step("Click on item sku Text box and add valid SKU and quantity");
    // cy.enterValue(selectors.quickOrderSku1,product_test_data.item_id)
    // cy.enterValue(selectors.quickOrderQty1,'1')
    shoppingcartpage.typeItemSKULargeOrderPad(1, product_test_data.item_id);
    shoppingcartpage.typeItemQuantityLargeOrderPad(1, 1);

    cy.step("Click on item sku Text box and add invalid SKU and quantity");
    // cy.enterValue(selectors.quickOrderSku2,'SE')
    // cy.enterValue(selectors.quickOrderQty2,'1')
    shoppingcartpage.typeItemSKULargeOrderPad(2, "SE");
    shoppingcartpage.typeItemQuantityLargeOrderPad(2, 1);

    cy.step("Click on Validate Button");
    cy.clickOnButton("Validate");
    cy.wait(1000);

    cy.step("verify validate Tick");
    cy.verifyTextValue(selectors.validateTick);
    cy.verifyTextValue(selectors.InvalidSKUMsg);
    cy.verifyLabel("div", "Invalid SKU");

    cy.clickOnButtonByXpath(selectors.checkbox2LargeOrderPad);
    cy.clickOnButton("DELETE");
    cy.clickOnButton("Validate");
    cy.clickOnButton("Add to cart");
    shoppingcartpage.verifyQuantityOfItem("1");
    cy.verifyLinkInDOM(
      "Item#: " + product_test_data.item_id,
      product_test_data.item_link
    );
    cy.verifyLabel("span", product_test_data.item_price);
    shoppingcartpage.typeQuantityOfItem("2");
    //.verifyLabel('span', '54.12');
    shoppingcartpage.verifySubTotalWhenQuantityChange( product_test_data.item_price,2);
    });
});
