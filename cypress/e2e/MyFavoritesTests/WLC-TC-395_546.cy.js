import ProductPage from "../../PageObjects/ProductPage";
import MyFavoritesPage from "../../PageObjects/MyFavoritesPage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";
import selectors from "../../support/selectors";

describe("My Favorites Test", () => {
  const productpage = new ProductPage();
  const myFavpage = new MyFavoritesPage();
  const shoppingcartpage = new ShoppingCartPage();

  //Access data through hooks for multiple it blocks
  let product_test_data;
  before(() => {
    cy.fixture(Cypress.env("fixtureFolder") + "/product_MA990.json").then((data) => {
      product_test_data = data;
    });
  });

  before(() => {
    cy.visit("/");
    cy.login();
    cy.setAccountShippingAddress();
    cy.verifySiteLoaded();

    cy.step("data clear action::item deleted from cart");
    cy.clickViewCartOnHeader();
    cy.verifyLabel("h1", "Shopping Cart");
    shoppingcartpage.clearAllItemsOnCart();
    
    cy.step("data clear action::item removed from favourites");
    cy.clickOnMainNavTab("Favorites");
    myFavpage.clickOnRemoveOfAllFavoriteItems();
    
    cy.enterTextInSearchBar(product_test_data.item_id);
    cy.clickSearchSuggestion(product_test_data.item_id);
    cy.verifyLabel("span", product_test_data.item_name);
    productpage.clickAddToFavorites();
    cy.wait(5000);
    //btn text should change after click
    productpage.verifyAddedToFavoritesButton();
  });

  it("WLC-TC-395 & 546 Verify the My favorite page items functionalities", () => {
    cy.clickOnMainNavTab("Favorites");

    cy.step('navigated to the relevant product page by clicking product image')
    myFavpage.clickFavouriteItemImage(product_test_data.item_id)
    productpage.verifyProductName(product_test_data.item_name)

    cy.clickOnMainNavTab("Favorites");

    cy.step("click On View Item Attribute");
    myFavpage.clickOnViewItemAttribute();
    cy.wait(3000);
    cy.step(
      'option text value should changed to "Hide item attributes" and click link'
    );
    myFavpage.verifyAndClickOnHideItemAttribute();
    cy.step("Click show my price option");
    myFavpage.clickOnShowMyPrice(product_test_data.item_id);
    cy.verifyLabel("span", product_test_data.item_price);

    cy.step(
      "User should not be able to insert zero values, letters or any special charters on quantity field"
    );
    myFavpage.enterQuantity(product_test_data.item_id, "0");
    myFavpage.enterQuantity(product_test_data.item_id, "A");
    myFavpage.enterQuantity(product_test_data.item_id, "&*");
    cy.step(
      "incorrect values cannot be entered hence input box should be empty"
    );
    myFavpage.verifyQuantityValue(product_test_data.item_id, "");

    cy.step("enter correct value for quantity");
    myFavpage.enterQuantity(product_test_data.item_id, product_test_data.minimum_quantity);
    myFavpage.verifyQuantityValue(product_test_data.item_id, product_test_data.minimum_quantity);

    cy.step("Add to cart buttons should enable once user added a quantity");
    myFavpage.verifyAddToCartIsEnabled(product_test_data.item_id);

    cy.step("select a Shipping Option from the dropdown");
    myFavpage.clickChangeShippingOptions(
      product_test_data.item_id,
      "CHANGE SHIPPING OPTIONS"
    );
    cy.selectDropdownByIndex(selectors.drpBackordered, 2);

    cy.step(
      "TC 546-User should be able to view details of the product stock availability "
    );
    //stock availbilty status
    myFavpage.getStockAvailabilityStatus();

    cy.step("click AddToCart");
    myFavpage.clickAddToCart(product_test_data.item_id);

    cy.step("click ViewCart On Popup");
    cy.clickViewCartOnPopup();
    shoppingcartpage.verifyNavigateToShoppingCartPage()
  });
});
