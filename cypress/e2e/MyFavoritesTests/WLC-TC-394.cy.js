import MyFavoritesPage from "../../PageObjects/MyFavoritesPage";
import ProductPage from "../../PageObjects/ProductPage";

describe("My Favorites Test", () => {
  const productpage = new ProductPage();
  const myFavpage = new MyFavoritesPage();

  let product_test_data1;
  let product_test_data2;
  before(() => {
    //product_MA990
    cy.fixture(Cypress.env("fixtureFolder") + "/product_MA990.json").then((data) => {
      product_test_data1 = data;
    });
    cy.fixture(Cypress.env("fixtureFolder") + "/product_GLS909.json").then((data) => {
      product_test_data2 = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.setAccountShippingAddress();
    cy.verifySiteLoaded();

    cy.step("data clear action::item removed from favourites");
    cy.clickOnMainNavTab("Favorites");
    myFavpage.clickOnRemoveOfAllFavoriteItems();

    // cy.verifyLink("Shop By Category");
    // cy.wait(5000);
    // cy.clickOnCategoryMenuToggle();
    // cy.selectCategory("Abrasives");
    // cy.clickonLink("Accessories");
    // cy.scrollDown(0, 600);
    // //cy.selectItemByIndex("View item",0);
    // cy.clickViewItemByItemCode("MA990-1/4");

    cy.step("search product: " + product_test_data1.item_id);
    cy.enterTextInSearchBar(product_test_data1.item_id);
    cy.clickSearchSuggestion(product_test_data1.item_id);
    cy.verifyLabel("span", product_test_data1.item_name);

    productpage.clickAddToFavorites();
    cy.wait(5000);
    //btn text should change after click
    productpage.verifyAddedToFavoritesButton();

    // cy.clickOnCategoryMenuToggle();
    // cy.selectCategory("Adhesives, Caulking & Sealants");
    // cy.clickonLink("Adhesive Guns");
    // cy.scrollDown(0, 600);
    // //cy.selectItemByIndex("View item",3);
    // cy.clickViewItemByItemCode("GLS909-GUN");
    // cy.wait(3000);

    cy.step("search product: " + product_test_data2.item_id);
    cy.enterTextInSearchBar(product_test_data2.item_id);
    cy.clickSearchSuggestion(product_test_data2.item_id);
    cy.verifyLabel("span", product_test_data2.item_name);


    productpage.clickAddToFavorites();
    cy.wait(5000);
    productpage.verifyAddedToFavoritesButton();
  });

  it("WLC-TC-394 Verify the My Favorites page Sort and Filter options", () => {
    cy.clickOnMainNavTab("Favorites");

    cy.step('verify and click Item Sort Filter')
    myFavpage.verifyAndClickSortFilter(0,'asc')

    cy.step('verify and click Order Date Sort Filter')
    myFavpage.verifyAndClickSortFilter(1,'asc')

    cy.step('verify and click Order Count Sort Filter')
    myFavpage.verifyAndClickSortFilter(2,'asc')

    cy.step("click on category");
    myFavpage.clickOnCategory();
    cy.wait(3000);

    cy.step("verify category list has category of added My favorite items.");
    myFavpage.verifyCategories(product_test_data1.item_category);
    myFavpage.verifyCategories(product_test_data2.item_category);
    

    //Items which are only assigned to the selected brand/brands should be listed
    cy.step("click On Brands");
    myFavpage.clickOnBrands();
    
    cy.step("verify brand list has brand of added My favorite items.");
    //cy.clickOnCheckBoxByIndex(0);
    myFavpage.clickOnCategoryType(product_test_data1.item_brand);
    cy.wait(1000);
    cy.step('verify brand of  item by clicking view items attribute')
    cy.clickLink("View item attributes");
    cy.verifyLabel("li", product_test_data1.item_brand);
    //cy.clickOnCheckBoxByIndex(1);
    myFavpage.clickOnCategoryType(product_test_data2.item_brand);
    cy.wait(1000);
    cy.step('verify brand of  item by clicking view items attribute')
    cy.clickLink("View item attributes");
    cy.verifyLabel("li", product_test_data2.item_brand);
    //cy.wait(5000);

    cy.step('Deselect the filter checkbox on brand')
    myFavpage.clickOnCategoryType(product_test_data1.item_brand);
    myFavpage.clickOnCategoryType(product_test_data2.item_brand);
    cy.wait(2000)

    cy.step('remove favourite item')
    myFavpage.clickOnRemoveByItem(product_test_data1.item_id);
    cy.wait(5000);

    

  });
});
