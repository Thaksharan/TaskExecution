///<reference types="Cypress"/>
import selectors from "../../support/selectors.js";

describe("Logged Out Tests", () => {
  //Access data through hooks for multiple it blocks
  let search_products;
  before(() => {
    cy.fixture(Cypress.env("fixtureFolder") + "/search_products.json").then(
      (data) => {
        search_products = data;
      }
    );
  });

  beforeEach(() => {
    cy.visit("/");
    cy.closeAdvertisementPopup()
    cy.clickSearchBar();
    cy.verifyCountrySelectorPopup();
    cy.enterCountryInCountrySelectorPopup("SL");
    cy.clickContinuInCountrySelectorPopup();
  });

  it("WLC-TC-383 [Logged Out] Verify Search", () => {
    cy.step("Search bar enter a Key word");
    cy.enterTextInSearchBar("se90");
    cy.step("Click on one suggestion from list");
    //cy.mouseOver('SE901')
    cy.clickSearchSuggestion(search_products.SE901_sku);
    cy.verifyLabel("span", search_products.SE901_name);

    cy.step("add SKU in search bar and hit enter");
    cy.searchFromSearchBar(search_products.SE902_sku);
    cy.verifyLabel("span", search_products.SE902_name);
    cy.verifyBreadcrumbText(search_products.SE902_breadcrumb);

    cy.step("Enter SKU in search bar and click on search icon");
    cy.searchFromSearchBar(search_products.WRBS07CLR_sku);
    cy.verifyAndClickImageByXpath(selectors.searchImage);
    cy.verifyLabel("span", search_products.WRBS07CLR_name);
    cy.verifyBreadcrumbText(search_products.WRBS07CLR_breadcrumb);

    cy.step("Enter Invalid data and hit enter");
    cy.searchFromSearchBar(search_products.not_found_item);
    cy.verifyLabel("h5", "Item Not Found");
    cy.verifyLabel(
      "p",
      "Sorry, the information you are searching for isn't in the database. Please refine your search and try again."
    );

    cy.step("Click ok on popup");
    cy.selectButtons("OK");
    cy.verifyUrls(Cypress.config("baseUrl"));

    cy.step(
      'Type a DL Item which is "web visible = N " in PIM in the search bar and hit enter'
    );
    cy.searchFromSearchBar(search_products.discontinued_item);
    cy.verifyLabel("h5", "Discontinued");
    cy.verifyLabel(
      "p",
      "We're sorry, that product has been discontinued.Would you like to go to its category to find a substitute?"
    );

    cy.step('Click "Yes" Button on popup');
    cy.selectButtons("YES");
    cy.verifyLabel("h5", "Categories");
    cy.clickLink("Brands");
    cy.verifyElementsByXpath(selectors.listProducts);

    cy.step('Click "No" Buttons on popup');
    cy.searchFromSearchBar(search_products.discontinued_item);
    cy.selectButtons("NO");
    cy.verifyUrls(Cypress.config("baseUrl"));
  });
});
