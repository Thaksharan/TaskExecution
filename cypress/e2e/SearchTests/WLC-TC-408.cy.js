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
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("US")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-408 [Logged In][Logged Out][Add to Cart] Verify Cloud Search', () => {

//logout search
      cy.step('Enter a search keyword')
      cy.enterTextInSearchBar('chemcraft');

      cy.step('able to see the order of the display as follows')
      cy.verifyListHeadingsDisplayOnSearchSuggestion()

      cy.step('click on Brand logo under brands on search suggestion')
      cy.clickBrandBlock()
      cy.verifySearchResultsIsLoaded()
      cy.step('verify Brand Native Search Results Page Loaded')
      cy.verifyBrandNativeSearchResultsPage('chemcraft')

      cy.step('Enter a search keyword')
      cy.enterTextInSearchBar('Knobs');

      cy.step('click on product under products on search suggestion')
      cy.clickProductSuggested(0)
      cy.step('verify Product Page Loaded')
      productpage.verifyProductNameLabelVisible()

      cy.step('Enter a search keyword')
      cy.enterTextInSearchBar('Adhesive');

      cy.step('click on category under Categories on search suggestion')
      cy.clickCategorySuggested(0);
      cy.step('verify Category Page Loaded');
      cy.verifyBreadcrumbText(["Adhesives, Caulking & Sealants","Adhesives"]);
        
      cy.section('Type something in search bar and check suggestion list is accurate')
      cy.enterTextInSearchBar("Plastic Cutting 'O' Straight");
      cy.verifySearchResultsSuggestionListHasKey("Plastic Cutting 'O' Straight");

      cy.enterTextInSearchBar('7/8" Brass Base');
      cy.verifySearchResultsSuggestionListHasKey('7/8" Brass Base');
      cy.clearCookies()

      cy.enterTextInSearchBar("Clip Top 120°+ Opening Hinge");
      cy.verifySearchResultsSuggestionListHasKey("Clip Top 120°+ Opening Hinge");

//Login-Search

      cy.step('[Login]')
      cy.login();
      cy.setAccountShippingAddress()
      cy.verifySiteLoaded()

      cy.step('Enter a search keyword')
      cy.enterTextInSearchBar('drawer');

      cy.step('able to see the order of the display as follows')
      cy.verifyListHeadingsDisplayOnSearchSuggestion()

      cy.step('click on Brand logo under brands on search suggestion')
      cy.clickBrandBlock()
      cy.verifySearchResultsIsLoaded()
      cy.step('verify Brand Native Search Results Page Loaded')
      cy.verifyBrandNativeSearchResultsPage('DOCKING DRAWER')

      cy.step('Enter a search keyword')
      cy.enterTextInSearchBar('grass');

      cy.step('click on product under products on search suggestion')
      cy.clickProductSuggested(0)
      cy.step('verify Product Page Loaded')
      productpage.verifyProductNameLabelVisible()

      cy.step('Enter a search keyword')
      cy.enterTextInSearchBar('Machinery');

      cy.step('click on category under Categories on search suggestion')
      cy.clickCategorySuggested(0);
      cy.step('verify Category Page Loaded');
      cy.verifyBreadcrumbText(["Machinery","Saws"]);
        
      cy.section('Type something in search bar and check suggestion list is accurate')
      cy.enterTextInSearchBar('8mm x 57mm Brad Point');
      cy.verifySearchResultsSuggestionListHasKey('8mm x 57mm Brad Point');

      cy.enterTextInSearchBar("TapeNix™ Temporary Drawer");
      cy.verifySearchResultsSuggestionListHasKey("TapeNix™ Temporary Drawer");

      cy.enterTextInSearchBar("358/359M+K");
      cy.verifySearchResultsSuggestionListHasKey("358/359M+K");


//Add to cart-Search

      const skuNumber = 'SE901';
      const productName = 'SeamFil Laminate Repair 1 oz Tube, White';


      productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
      cy.step('Enter a search keyword')
      cy.enterTextAddtoCartSearchBar('Wood');

      cy.step('able to see the order of the display as follows')
      cy.verifyListHeadingsDisplayOnSearchSuggestion()

      cy.step('click on Brand logo under brands on search suggestion')
      cy.clickBrandBlock()
      cy.verifySearchResultsIsLoaded()
      cy.step('verify Brand Native Search Results Page Loaded')
      cy.verifyBrandNativeSearchResultsPage('DOLLKEN WOODTAPE')

      productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
      cy.step('Enter a search keyword')
      cy.enterTextAddtoCartSearchBar('pvc edgeband');

      cy.step('click on product under products on search suggestion')
      cy.clickProductSuggested(0)
      cy.step('verify Product Page Loaded')
      productpage.verifyProductNameLabelVisible()

      productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
      cy.step('Enter a search keyword')
      cy.enterTextAddtoCartSearchBar('catches');

      cy.step('click on category under Categories on search suggestion')
      cy.clickCategorySuggested(2);
      cy.step('verify Category Page Loaded');
      cy.verifyBreadcrumbText(["Catches & Locks","Catches, Bolts & Latches","Knuckle Catches"]);
       
      productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
      cy.section('Type something in search bar and check suggestion list is accurate')
      cy.enterTextAddtoCartSearchBar('#2 x 1" Phillips Drive');
      cy.verifySearchResultsSuggestionListHasKey('#2 x 1" Phillips Drive');
      cy.clickCloseBtnOnCartPopup();
 
    })

})


