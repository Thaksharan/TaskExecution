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
      //product_MA990
      cy.fixture(Cypress.env("fixtureFolder") +'/product_MA990.json').then((data)=>{
       product_test_data=data
      })
    })

    beforeEach(()=>{
            cy.visit('/')
            cy.login();
            cy.setAccountShippingAddress()
            cy.verifySiteLoaded()
            // cy.on('uncaught:exception', (err, runnable) => {
            //     return false
            //  }) 

            cy.step('data clear action::item deleted from cart')
            cy.clickViewCartOnHeader();
            cy.verifyLabel("h1","Shopping Cart");
            shoppingcartpage.clearAllItemsOnCart()
            
            cy.step('data clear action::item removed from favourites')
            cy.clickOnMainNavTab('Favorites')
            myFavpage.clickOnRemoveOfAllFavoriteItems()
            
            cy.verifyLink("Shop By Category");
            cy.wait(5000);
            cy.clickOnCategoryMenuToggle();
            cy.selectCategory(product_test_data.item_category);
            cy.clickonLink(product_test_data.item_subCategory);
            cy.scrollDown(0,600);
        } ) 
    
        it('WLC-TC-391 & 565 & 567 & 563 Verify Product Page' , () =>{
             //select first item by click on first view item button and verify product details
             //cy.selectItemByIndex("View item","0");  
             cy.step('select item by click on  view item button and verify product details')   
             cy.clickViewItemByItemCode(product_test_data.item_id)      
             productpage.verifyProductName(product_test_data.item_name);

             cy.step('At the Top the Breadcrumb will display')
             const expectedAccessoriesTexts = [product_test_data.item_category, product_test_data.item_subCategory]
             cy.verifyBreadcrumbText(expectedAccessoriesTexts);

             cy.step('by clicking on it user able to go back to previous pages')
             cy.clickBreadCrumb(product_test_data.item_subCategory)
             cy.verifyLabel("h1",product_test_data.item_subCategory)

             cy.step('again select item by click on  view item button')   
             cy.clickViewItemByItemCode(product_test_data.item_id)      
             productpage.verifyProductName(product_test_data.item_name);

             cy.step('select item variation from dropdown')
             productpage.selectItemvariationFromDropdown(product_test_data.item_dd_selection)
             productpage.verifySelectedItemVariationDropdown(product_test_data.item_dd_selection)

             productpage.verifyitemManufacturerNo(product_test_data.item_manufacturer_no)
             productpage.verifyItemPrice(product_test_data.item_price)
             productpage.verifyQuantityLabel()
             productpage.verifyMinOrderLabel()
             productpage.verifyAddToCart();

             cy.step('verify favourite button')
             productpage.verifyAddToFavoritesButton();

             cy.step('verify product image zoom in')
             productpage.clickProductMainImageToZoom()
             //cy.verifyAndClickImageByIndex(selectors.imgProduct,1);
             productpage.clickCloseInImage();
            
             cy.step('Add the Quantity in the Quantity space')
             //verify shipping options by entering min order quantity
             productpage.typeQuantityOfItem(product_test_data.minimum_quantity);

             cy.step('verify shipping options')
             productpage.verifyShippingOption();
             productpage.verifyAddToCartIsEnabled();

             cy.step('TC 565-User should be able to view details of the product stock availability ')
             //stock availbilty status
             productpage.verifyStockLocationSameDayShipping()

             cy.step('tc 567- increase quantity until Ship from alternative branch option is available')
             productpage.typeQuantityOfItem('90000')
             productpage.verifyShippingOption();

             cy.step('Click on an option in the Shipping Options dropdown')
             productpage.selectShippingOptionMainProduct('Truck')

             cy.step('verify If CheckOtherBranches Availble')
             productpage.verifyIfCheckOtherBranchesAvailble()
             
             // cy.selectDropdownByIndex(selectors.drpBackordered,2);
            // cy.clickOnCheckBoxByIndex(0);

             cy.step('verify bottom selections on product page')
             cy.scrollDown(0,800);
             //cy.wait(8000);
             cy.verifyLink("Variations");
             cy.verifyLink("Product Details");
             cy.verifyLink("Accessories & Related Products");
             cy.verifyLink("Documents");
             cy.verifyLink("FAQs");
             
            cy.step('Click Add to favorite')
            productpage.clickAddToFavorites()
            cy.step('display the toast message “Adding item to favorites“')
            productpage.verifyToast()
            //btn text should change after click
            productpage.verifyAddedToFavoritesButton()

            cy.step('again click added to favorite')
            productpage.clickAddedToFavouriteButton()
            myFavpage.verifyNavigateToFavoritePage()

            cy.step('again navigate to product page')
            cy.enterTextInSearchBar(product_test_data.item_id);
            cy.clickSearchSuggestion(product_test_data.item_id);
            cy.verifyLabel('span', product_test_data.item_name);

            cy.step('Add the Min Quantity in the Quantity space again')
            //verify shipping options by entering min order quantity
            productpage.typeQuantityOfItem(product_test_data.minimum_quantity);
     
            // cy.scrollDown(0,800);
            cy.step('Click add to cart button')
            productpage.clickAddToCart();

            cy.step('verify View Cart Popup')
            cy.verifyItemAddedToCartPopup()
            cy.verifyViewCartOnPopup();
            
            cy.step('TC 563-view details of the product stock availability on add to cart popup ')
            cy.getStockStatusOnCartPopup()
            cy.step('TC 563-view details of the product shipping options on add to cart popup ')
            cy.getShippingMethodOfItemOnCartPopup()

            cy.clickViewCartOnPopup();
            shoppingcartpage.verifyNavigateToShoppingCartPage()

            cy.step('TC 563-view details of the product stock availability')
            shoppingcartpage.clickChangeShippingOptionsWithoutID()
            //stock availbilty status
            cy.step('TC 563-view details of the product shipping options ')
            shoppingcartpage.verifyStockLocationSameDayShipping()
  
        }) 
    })