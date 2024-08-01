import HomePage from "../../PageObjects/HomePage";
import MyPurchasedItemsPage from "../../PageObjects/MyPurchasedItemsPage";
import MyFavoritesPage from "../../PageObjects/MyFavoritesPage";
//import selectors from '../../support/selectors.js';

describe('My Purchased Items Tests', () => {
    const homepage = new HomePage();
    const myPurchasedItems=new MyPurchasedItemsPage()
    const myFavpage=new MyFavoritesPage();

    beforeEach(() => {
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.clickOnMainNavTab('Favorites')
        myFavpage.clickOnRemoveOfAllFavoriteItems()
        cy.log('data clear action::item removed from favourites')
    })
    
    it('WLC-TC-397 Verify the My Purchased Items Section Functionalities', () => {
        cy.clickOnMainNavTab('Purchased Items')
        myPurchasedItems.verifyMyPurchasedItemsPageHeader()

        //To DO-way select date range then other steps on search
        // cy.step('Select "Custom" on duration dropdown and select date rage')
        // myPurchasedItems.setDuration('Custom')
        // myPurchasedItems.setDateRange()
        // cy.wait(8000)

        cy.step('Click on Show my price of a displayed Purchased Item')
        //To do-change to select first product on list 397.398
        //myPurchasedItems.clickOnShowMyPrice("MA990-1/4");
        myPurchasedItems.clickOnShowMyPriceWithoutID()
        myPurchasedItems.verifyShownPrice()

        cy.step('Click on the Add to Favorites button')
        //myPurchasedItems.clickAddToFavouriteBtn('MA990-1/4')
        myPurchasedItems.clickAddToFavouriteBtnWIthoutID()
        myPurchasedItems.verifyFavBtnTextChangeAfterClick()
        cy.step('Click on the Added to Favorites button')
        myPurchasedItems.clickAddedToFav()
        //myFavpage.verifyItemExistOnFavPage('MA990-1/4')


        
        
    })

})


