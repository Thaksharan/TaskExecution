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
       cy.fixture(Cypress.env("fixtureFolder") +'/product_SE901.json').then((data)=>{
        product_test_data=data
       })
     })

    beforeEach(()=>{
            cy.visit('/')
            cy.login();
            cy.setAccountShippingAddress()
            cy.verifySiteLoaded()

            cy.step('data clear action::item deleted from cart')
            cy.clickViewCartOnHeader();
            cy.verifyLabel("h1","Shopping Cart");
            shoppingcartpage.clearAllItemsOnCart()

            cy.step('data clear action::item removed from favourites')
            cy.clickOnMainNavTab('Favorites')
            myFavpage.clickOnRemoveOfAllFavoriteItems()

            cy.step('search product: ' + product_test_data.item_id)
            cy.enterTextInSearchBar(product_test_data.item_id);
            cy.clickSearchSuggestion(product_test_data.item_id);
            cy.verifyLabel('span', product_test_data.item_name);
    
        } ) 
    
        it('WLC-TC-392 & 542 Verify the Variation section' , () =>{

            cy.step('able to see available product variations in variation section')
            productpage.verifyVariation();

            cy.step('item # in the Dropdown variation and variation detail section should be same')
            productpage.verifySelectedVariationFromDropDown(product_test_data.item_id)
            productpage.compareVariationFromDropDownAndVariationInSection(product_test_data.item_id);

            cy.step('Add to cart button should be disable for all the product')
            productpage.verifyAddToCartIsDisabled();

            cy.step('verify variation contains')
            cy.verifyLabel('div','PRICE BREAKDOWN');
            cy.verifyLabel('th','Quantity');
            cy.verifyLabel('span','CHANGE SHIPPING OPTIONS');
            cy.verifyLabel('th','Item # / MFR Part #');
            cy.verifyLabel('th','Price');
            cy.verifyLabel('strong','Min: ');
            cy.verifyLabel('strong','Multiples: ');

            cy.step('Click on "Add to favorites" Button infront of the product')
            productpage.clickAddToFavoritesImageInVariations(product_test_data.item_id);
            productpage.clickOnPriceBreakdownInVariations(product_test_data.item_id);
            cy.wait(3000);
            cy.step('close the price breakdown popup')
            productpage.clickOnPriceBreakdownInVariations(product_test_data.item_id);

            cy.step('verify if Color Filter Available In Variations,selected color is highlited')
            productpage.verifyColorFilterAvailableInVariations()

            cy.step('User added quantity should be displayed on the Quantity text box')   
            productpage.enterQtyInVariations(product_test_data.item_id,90000);
            productpage.verifyAddToCartInVariationsIsEnabled(product_test_data.item_id);
            //sometimes shipping options not showed--+++++++++issue
            cy.step('User should be able to view details of the product stock availability and shipping options ')
            productpage.clickChangeShippingOptionsVariations(product_test_data.item_id);

            cy.step('TC 542-User should be able to view details of the product stock availability  and shipping options')
             //stock availbilty status
            productpage.verifyStockLocationSameDayShipping()

            cy.step('able to select a Shipping Option from the dropdown')
            productpage.selectBreaCAInVariations(2);
            //cy.verifySelectedValueByXpath(selectors.drpBackordered,'T');
            productpage.selectShippingOptionVariation('Truck')

            cy.step('able to select the Ship From Alternative Branch(es) option')
            cy.clickonLink('More Options');
            productpage.clickOnShipFromAlternativeBranchVariations();

            cy.step('Ship From Alternative Branch(es) should not be deselected when user clicks on Less Options')
            cy.clickonLink('Less Options');
            productpage.verifyFirstShippingOptionIsDisabled();
            cy.clickonLink('More Options');
            cy.verifyRadioIsChecked(selectors.rdoShipFromAlternativeVariation);

            cy.step('click AddToCart In Variations section')
            productpage.clickAddToCartInVariations(product_test_data.item_id);

            cy.step('verify View Cart Popup')
            cy.verifyItemIdOnPopup(product_test_data.item_id);
            cy.verifyItemQuantityOnPopup('90000');;
            cy.verifyViewCartOnPopup();
            cy.clickViewCartOnPopup(); 
    
             
        }) 
        
     
       
    })