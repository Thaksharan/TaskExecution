///<reference types="Cypress"/>
import ProductPage from '../../PageObjects/ProductPage.js';
import selectors from '../../support/selectors.js';
import ShoppingCartPage from '../../PageObjects/ShoppingCartPage.js';

describe('Search Tests', () => {

  const productpage = new ProductPage();
  const shoppingcartpage=new ShoppingCartPage();

    //Access data through hooks for multiple it blocks
    let search_products
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/search_products.json').then((data)=>{
        search_products=data
      })
    })

    beforeEach(() => {
      cy.visit('/')
      cy.clickSearchBar();
      cy.verifyCountrySelectorPopup()
      cy.enterCountryInCountrySelectorPopup("SL")
      cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-388 [Logged In][Logged Out][Add to Cart] Verify Native Search', () => {

        // cy.step('Click on one suggestion from list')
        // cy.enterTextInSearchBar(search_products.SE901_sku);
        // cy.clickSearchSuggestion(search_products.SE901_sku);
        // cy.verifyLabel('span', search_products.SE901_name);

        // cy.step('add SKU in search bar and hit enter')
        // cy.searchFromSearchBar(search_products.SE902_sku);
        // cy.verifyLabel('span', search_products.SE902_name);
        // cy.verifyBreadcrumbText(search_products.SE902_breadcrumb);

        // cy.step('Enter SKU in search bar and click on search icon')
        // cy.searchFromSearchBar(search_products.WRBS07CLR_sku);
        // cy.verifyAndClickImageByXpath(selectors.searchImage);
        // cy.verifyLabel('span',search_products.WRBS07CLR_name);
        // cy.verifyBreadcrumbText(search_products.WRBS07CLR_breadcrumb);

        // cy.step('Enter Invalid data and hit enter')
        // cy.searchFromSearchBar(search_products.not_found_item);
        // cy.verifyLabel('h5', 'Item Not Found');
        // cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");

        // cy.step('Click ok')
        // cy.selectButtons('OK');
        // cy.verifyUrls(Cypress.config('baseUrl'));

//Logout- Search
        cy.step('Type a DL Item which is "web visible = N " in PIM in the search bar and hit enter')
        cy.searchFromSearchBar(search_products.discontinued_item);
        cy.verifyLabel('h5', 'Discontinued');
        cy.verifyLabel('p', "We're sorry, that product has been discontinued.Would you like to go to its category to find a substitute?");

        cy.step('Click "Yes" Button on popup')
        cy.selectButtons('YES');
        cy.verifyLabel('h5', 'Categories');
        cy.clickLink('Brands');
        cy.verifyElementsByXpath(selectors.listProducts);

        cy.step('Click "No" Buttons on popup')
        cy.searchFromSearchBar(search_products.discontinued_item);
        cy.selectButtons('NO');
        cy.verifyUrls(Cypress.config('baseUrl'));

        cy.step('Type a "web visible = N " in PIM in the search bar and hit enter')
        cy.searchFromSearchBar(search_products.webvisible_N_item1);
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");

        cy.step('Click "OK" Button on popup')
        // cy.searchFromSearchBar(search_products.webvisible_N_item1);
        cy.clickOKBtninPopUp();
        cy.verifyUrls(Cypress.config('baseUrl'));

        cy.step('type in search bar and hit enter')
        cy.searchFromSearchBar(search_products.SE902_sku);
        cy.verifyLabel('span', search_products.SE902_name);
       // const expectedSP12HTexts = search_products.SE902_breadcrumb
        cy.verifyBreadcrumbText(search_products.SE902_breadcrumb);

        cy.step('type in search bar and click on search icon')
        cy.searchFromSearchBar(search_products.WRBS07CLR_sku);
        cy.verifyAndClickImageByXpath(selectors.searchImage);
        cy.verifyLabel('span',search_products.WRBS07CLR_name);
        //const expectedWRBS07CLRTexts = ['Hinges and Lift Systems', 'Accessories', 'Door Bumpers', '3/8" Diameter Hemispherical Door Bumper, C...']
        cy.verifyBreadcrumbText(search_products.WRBS07CLR_breadcrumb);

//Login- Search
        cy.step('[Login]')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.step('Type a DL Item which is "web visible = N " in PIM in the search bar and hit enter')
        cy.searchFromSearchBar(search_products.discontinued_item);
        cy.verifyLabel('h5', 'Discontinued');
        cy.verifyLabel('p', "We're sorry, that product has been discontinued.Would you like to go to its category to find a substitute?");

        cy.step('Click "Yes" Button on popup')
        cy.selectButtons('YES');
        cy.verifyLabel('h5', 'Categories');
        cy.clickLink('Brands');
        cy.verifyElementsByXpath(selectors.listProducts);

        cy.step('Click "No" Buttons on popup')
        cy.searchFromSearchBar(search_products.discontinued_item);
        cy.selectButtons('NO');
        cy.verifyUrls(Cypress.config('baseUrl'));

        cy.step('Type a "web visible = N " in PIM in the search bar and hit enter')
        cy.searchFromSearchBar(search_products.webvisible_N_item2);
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");

        cy.step('Click "OK" Buttons on popup')
        cy.clickOKBtninPopUp();
        cy.verifyUrls(Cypress.config('baseUrl'));

        cy.step('type in search bar and hit enter')
        cy.searchFromSearchBar('3/8" x 9/64" Carbide');
        cy.verifyLabel('span', '3/8" x 9/64" Carbide');
        cy.verifySearchResultsIsLoaded();
        cy.verifyBreadcrumbText(["Search",'3/8" x 9/64" Carbide']);
        cy.verifySearchResultsNameHasKey('3/8" x 9/64" Carbide');

        cy.step('type in search bar and click on search icon')
        cy.searchFromSearchBar('1-3/8" square knob');
        cy.verifyAndClickImageByXpath(selectors.searchImage);
        cy.getSearchResultsCount();
        cy.verifySearchResultsIsLoaded();
        cy.verifyBreadcrumbText(["Search",'1-3/8" square knob']);
        cy.verifySearchResultsNameHasKey('1-3/8"');
        cy.verifySearchResultsNameHasKey('square knob');

//Add to cart -search
        const skuNumber = 'SE901';
        const productName = 'SeamFil Laminate Repair 1 oz Tube, White';

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.step('Type a DL Item which is "web visible = N " in PIM in the search bar and hit enter')
        cy.searchFromSearchBar(search_products.discontinued_item);
        cy.verifyLabel('h5', 'Discontinued');
        cy.verifyLabel('p', "We're sorry, that product has been discontinued.Would you like to go to its category to find a substitute?");

        cy.step('Click "Yes" Button on popup')
        cy.selectButtons('YES');
        cy.verifyLabel('h5', 'Categories');
        cy.clickLink('Brands');
        cy.verifyElementsByXpath(selectors.listProducts);

        cy.step('Click "No" Buttons on popup')
        cy.searchFromSearchBar(search_products.discontinued_item);
        cy.selectButtons('NO');
        cy.verifyUrls(Cypress.config('baseUrl'));


        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.step('Type a "web visible = N " in PIM in the search bar and hit enter')
        cy.searchFromSearchBar(search_products.webvisible_N_item2);
        cy.verifyLabel('h5', 'Item Not Found');
        cy.verifyLabel('p', "Sorry, the information you are searching for isn't in the database. Please refine your search and try again.");

        cy.step('Click "OK" Buttons on popup')
        cy.clickOKBtninPopUp();
        cy.verifyUrls(Cypress.config('baseUrl'));

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.step('type in search bar and hit enter')
        cy.searchFromSearchBar('26.2lb cylinder');
        cy.verifySearchResultsIsLoaded();
        cy.verifyBreadcrumbText(["Search",'26.2lb cylinder']);
        cy.verifySearchResultsNameHasKey('26.2lb cylinder');

        productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
        cy.step('type in search bar and click on search icon')
        cy.searchFromSearchBar('$10,000 WIPE STAIN');
        cy.verifyAndClickImageByXpath(selectors.searchImage);
        cy.verifySearchResultsIsLoaded();
        cy.verifyBreadcrumbText(["Search","$10,000 WIPE STAIN"]);
        cy.verifySearchResultsNameHasKey('$10,000');
        cy.verifySearchResultsNameHasKey('WIPE');
        cy.verifySearchResultsNameHasKey('STAIN');
    })


})


