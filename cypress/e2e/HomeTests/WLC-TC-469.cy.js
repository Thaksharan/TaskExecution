///<reference types="Cypress"/>
import HomePage from "../../PageObjects/HomePage";
import MyFavoritesPage from "../../PageObjects/MyFavoritesPage.js";
import selectors from '../../support/selectors.js';

describe('Home Tests', () => {
    const homepage = new HomePage();
    const myFavpage=new MyFavoritesPage();

    beforeEach(() => {
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.clickOnMainNavTab('Favorites')
        myFavpage.clickOnRemoveOfAllFavoriteItems()
        cy.log('data clear action::item removed from favourites')

        cy.clickOnMainNavTab('Home')
    })
    
    it('WLC-TC-469 [Logged In][Feature Products] Verify the feature products functionalities', () => {

        cy.step('verify feature product header label')
        homepage.verifyFeaturedProductsHeader()

        cy.step('verify Feature Products slider and item block')
        homepage.verifyFeaturedProductsSlider()
        homepage.verifyItemBlockOnFeatureProductsTab()

        cy.step('verify Feature Products 4 Tabs and click')
        homepage.verifyAndClickFeatureProductsTabs()

        cy.step('Click on the carousal arrow keys')
        homepage.clickFeaturedSliderNextButton()
        homepage.clickFeaturedSliderPreviousButton()

        cy.step('Click on add to cart without entering a quantity')
        homepage.clickAddToCartOnItemBlock(1)
        homepage.verifyQuantityBoxOnError()

        cy.step('Enter zero, letters and special characters in the Qty field')
        homepage.typeQuantityBoxFeaturedProduct(1,"0")
        homepage.typeQuantityBoxFeaturedProduct(1,"A")
        homepage.typeQuantityBoxFeaturedProduct(1,"&*")
        cy.step('incorrect values cannot be entered hence input box should be empty')
        homepage.verifyQuantityBoxFeaturedProduct(1,'')

        cy.step('Click on the My Favorite button')
        homepage.clickAddToFavouritesButton(1)
        homepage.verifyButtonChangeToInMyFavourite(1)

        cy.step('Click on the green My Favorite button')
        homepage.clickInMyFavouriteButton(1)
        myFavpage.verifyNavigateToFavoritePage()

        cy.step('Navigate back to Home')
        cy.clickOnMainNavTab('Home')

        cy.step('Enter a valid quantity in the Qty field')
        homepage.typeQuantityBoxFeaturedProduct(1,"1")

        cy.step('Click on the Add to Cart button')
        homepage.clickAddToCartOnItemBlock(1)

        cy.step('verify ViewCart On Popup')
        cy.verifyViewCartOnPopup();
        cy.getStockStatusOnCartPopup()
        cy.getShippingMethodOfItemOnCartPopup()

        cy.clickContinueShoppingOnPopup()
        
        cy.step('Enter a large quantity in the Qty field')
        homepage.typeQuantityBoxFeaturedProduct(1,"99999")

        cy.step('Click on the Add to Cart button')
        homepage.clickAddToCartOnItemBlock(1)

        cy.step('verify ViewCart On Popup')
        cy.verifyViewCartOnPopup();
        cy.getStockStatusOnCartPopup()
        cy.getShippingMethodOfItemOnCartPopup()



        
        
    })

})


