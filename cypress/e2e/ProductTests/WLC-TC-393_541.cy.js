import ProductPage from "../../PageObjects/ProductPage";
import MyFavoritesPage from "../../PageObjects/MyFavoritesPage";
import ShoppingCartPage from "../../PageObjects/ShoppingCartPage";
import selectors from '../../support/selectors.js';


describe('Product Tests',() =>{
    const productpage=new ProductPage();
    const shoppingcartpage=new ShoppingCartPage(); 
    const myFavpage=new MyFavoritesPage(); 

    //Access data through hooks for multiple it blocks
    let product_test_data
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/product_MA340D.json').then((data)=>{
       product_test_data=data
      })
    })

    beforeEach(()=>{
            cy.visit('/')
            cy.login();
            cy.setAccountShippingAddress()
            cy.verifySiteLoaded()

            cy.clickViewCartOnHeader();
            cy.verifyLabel("h1","Shopping Cart");
            shoppingcartpage.clearAllItemsOnCart()
            cy.log('data clear action::item deleted from cart')

            cy.clickOnMainNavTab('Favorites')
            myFavpage.clickOnRemoveOfAllFavoriteItems()
            cy.log('data clear action::item removed from favourites')

            // cy.verifyLink("Shop By Category");
            // cy.wait(5000);
            // cy.clickOnCategoryMenuToggle();
            // cy.selectCategory("Abrasives");
            // cy.clickonLink("Belts");
            // cy.scrollDown(0,600);

            cy.enterTextInSearchBar(product_test_data.item_id);
            cy.clickSearchSuggestion(product_test_data.item_id);
            cy.verifyLabel('span', product_test_data.item_name);
        
        } ) 

        it('WLC-TC-393 & 541 Verify the Accessories and related item section' , () =>{

             cy.step('click Accessories & Related Products"')
             cy.clickLink("Accessories & Related Products");
             cy.verifyLabel('h4','Accessories and Related Products');
             cy.verifyLabel('p',product_test_data.related_item_name);
             
             cy.step('Add to cart button should be disable for all the product')
             productpage.verifyAddToCartInAccesoriesIsDisabled(product_test_data.related_item_id);

             cy.step('Price breakdown should show as a dropdown')
             productpage.clickOnPriceBreakdownInAccesories(product_test_data.related_item_id);
             cy.wait(1000);
             cy.step('close Price breakdown dropdown')
             productpage.clickOnPriceBreakdownInAccesories(product_test_data.related_item_id);

             cy.step('Click on the Add to Favorite button')
             productpage.clickAddToFavoritesImageInAccesories(product_test_data.related_item_id,"Add to favorites");
             cy.step('Click on the green My Favorite button-redirected to my favourite page')
             productpage.clickAddToFavoritesImageInAccesories(product_test_data.related_item_id,"In my favorites");

             cy.step('go back to product-state before got to favourite page')
             cy.enterTextInSearchBar(product_test_data.item_id);
             cy.clickSearchSuggestion(product_test_data.item_id);
             cy.verifyLabel('span', product_test_data.item_name);
             cy.clickLink("Accessories & Related Products");
             cy.verifyLabel('h4','Accessories and Related Products');

             cy.step('enter quantity')
             productpage.enterQtyInAccessories(product_test_data.related_item_id,1000);

             cy.step('click change Shipping Options on Accessories')
             productpage.changeShippingOptionsAccesories(product_test_data.related_item_id);
             productpage.selectBreaCAInAccessories(2);

             cy.step('TC 541-User should be able to view details of the product stock availability  and shipping options ')
             //stock availbilty status
            productpage.verifyStockLocationSameDayShipping()

             cy.step('able to select the Ship From Alternative Branch(es) ')
             cy.clickonLink('More Options');
             productpage.clickOnShipFromAlternativeBranchAccessories();
             cy.clickonLink('Less Options');
             productpage.verifyFirstShippingOptionIsDisabled();
             cy.clickonLink('More Options');
             cy.verifyRadioIsChecked(selectors.rdoShipFromAlternativeAccessories);
            //  cy.clickOnCheckBoxByIndex(0);
            //  cy.verifyLabel('label','Uncheck to return to home branch shipping options');
            //  cy.clickOnCheckBoxByIndex(0);
             
             cy.step('Click on Will Call Anywhere')
             cy.verifyLabel('strong','Will Call Anywhere.');
             productpage.checkWillCallAnyWhere()
             
             cy.step('click add to cart and click view cart from popup')
             productpage.clickAddToCartInAccesories(product_test_data.related_item_id);
             cy.clickViewCartOnPopup()
    
             
        }) 
        
       
    })







