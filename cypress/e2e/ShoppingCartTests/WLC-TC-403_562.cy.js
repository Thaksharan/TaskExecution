import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";

describe("Shopping Cart Tests", () => {
  const shoppingcartpage = new ShoppingCartPage();

  before(() => {
    cy.visit("/");
    cy.login();
    cy.setAccountShippingAddress();
    cy.verifySiteLoaded();
    cy.log("Login to the system successfully");

    cy.clickViewCartOnHeader();
    cy.verifyLabel("h1", "Shopping Cart");
    cy.wait(5000);
    shoppingcartpage.clearAllItemsOnCart();
  });

  it("WLC-TC-403_562 Verify Add to Cart Items via CSV or Excel File(Bulk Upload)", () => {

    cy.clickonLink("Shopping Cart");
    //cy.wait(3000)
    cy.step('Click on Download Template Link')
    cy.clickonLink("Download Template");
    cy.wait(3000);
    cy.step('sample template should be downloaded to the user’s local machine')
    cy.verifyCompareExcelFiles(
      "cypress/downloads/upload-order-form.xlsx",
      "cypress/fixtures/upload-order-form.xlsx"
    );
    cy.step('Click on Upload Order form link')
    cy.clickOnButton("Upload items list as excel/CSV file");
    cy.wait(5000);
    cy.step('User should be navigated to the upload-order-form page')
    cy.verifyLabel("h1", "Upload Order Form");

    cy.section('user upload invalid file- verify error msg display')
    cy.step('click on button Choose File')
    cy.clickOnButton("Choose File");
    cy.verifyfileUpload("cypress/fixtures/"+ Cypress.env("fixtureFolder")+ "/invalidLogin.json");
    cy.step('click on button UPLOAD')
    cy.clickOnButton("UPLOAD");
    cy.wait(2000)
    shoppingcartpage.verifyInvalidFileUploadError()

    cy.section('user upload valid file')
    cy.step('click on button Choose File')
    cy.clickOnButton("Choose File");
    cy.verifyfileUpload("cypress/downloads/upload-order-form.xlsx");
    cy.step('click on button UPLOAD')
    cy.clickOnButton("UPLOAD");
    cy.step('Click Confirm and add to cart button')
    cy.clickOnButton("Confirm and Add to Cart");
    cy.wait(5000);

    // .clickOnButton('Upload items list as excel/CSV file')
    // .wait(5000)
    // .verifyLabel('h1', 'Upload Order Form')
    // .clickOnButton('Choose File')
    // .verifyfileUpload('cypress/downloads/upload-order-form.xlsx')
    // .clickOnButton('UPLOAD')
    // .clickOnButton('Confirm and Add to Cart')
    // cy.wait(1000)
    //click confirm button of popup
    //cy.clickOnButtonByXpath(selectors.btnConfirm)

    cy.step(
      "TC 562-User should be able to view details of the product stock availability  and shipping options "
    );
    shoppingcartpage.clickChangeShippingOptionsWithoutID();
    //stock availbilty status
    shoppingcartpage.verifyStockLocationSameDayShipping();

    cy.wait(2000);
    cy.step('item unit price is visible')
    //cy.verifyLabel("span", "14.14");
    shoppingcartpage.getUnitPrice()
    cy.step('check subtotal for uploaded 4 items via execel file')
    shoppingcartpage.verifyQuantityOfItem(4)
   // shoppingcartpage.verifySubTotalWhenQuantityChange(14.14, 4);
    shoppingcartpage.verifySubTotalWhenQuantityChange2()
    cy.step('update the Quantity of added Product')
    shoppingcartpage.typeQuantityOfItem("2");
    //cy.wait(5000)
    //.verifyLabel('span', '73.99');
    //shoppingcartpage.verifySubTotalWhenQuantityChange(14.14, 2);
    shoppingcartpage.verifySubTotalWhenQuantityChange2()
  });
});
