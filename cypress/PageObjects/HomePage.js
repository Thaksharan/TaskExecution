import selectors from '../support/selectors.js';

class HomePage {
    // clickViewAccountHistory() {
    //     cy.get(selectors.linkViewAccountHistory).click();
    // }

    // clickLogout(){
    //     cy.get('ul.dropdown-menu.show')
    //       .find("[title='Logout']").eq(0).as('logout')
    //     cy.get('@logout').click({force:true})
    //     cy.on('uncaught:exception', (err, runnable) => {
    //         return false
    //       })
    // }

    

    // clickSearchBar(){
    //     cy.get(selectors.searchBar).should('be.not.disabled').click();
    // }

    verifyMyAccountDropdownSelectors() {
        cy.waitForStableDOM()
        cy.get('a').contains('My Orders').
            should('have.attr', 'href', '/myaccount/orderhistory').mouseOver('My Orders').wait(1000);
        cy.get('a').contains('My Purchased Items').
            should('have.attr', 'href', '/myaccount/purchaseditems').mouseOver('My Purchased Items');
        cy.get('a').contains('My Favorites').
            should('have.attr', 'href', '/myaccount/myfavorites').mouseOver('My Favorites');
        cy.get('a').contains('User Management').
            should('have.attr', 'href', '/myaccount/manage-users').mouseOver('User Management');
        cy.get('a').contains('Personal Navigation').
            should('have.attr', 'href', '/myaccount/personal-navigation').mouseOver('Personal Navigation');
        cy.contains('Logout').should("be.visible").mouseOver('Logout');

    }

    verifyFourFeaturedBrands() {
        cy.get(selectors.cardFeaturedBrand).eq(1)
            .find(selectors.boxFeaturedBrands)
            .should("have.length", 4);

    }

    clickFeatureTabSale(){
        cy.contains('.feature-tab-titles','Sale').click()
    }

    verifyInsideFeaturedBrand() {
        cy.get(selectors.cardFeaturedBrand).eq(1)
            .find(selectors.boxFeaturedBrands)
            .get('picture').should('be.visible')
            .get('.product-name').should('be.visible')
            .get('.variations-count').should('be.visible')
            .get('#fp_view_item')
            .should('exist')
            .and('have.attr', 'title', 'View item')
            .and('have.text', 'View item');


    }

    verifyAndClickWurthLogo() {
        cy.get(selectors.wurthLogo).should('be.visible').click();
    }

    verifyFooterStaticPages() {
        cy.get(selectors.footer).should('be.visible')
            .get('.company-info')
            .find('h4')
            .should('have.text', 'Company Information')
            .xpath(selectors.ulFooterComapnyInfo)
            .find('li')
            .should('have.length', 3)
            .should('contain', 'About Us')
            .should('contain', 'Careers')
            .should('contain', 'Compliance')

            .get('.my-account')
            .find('h4')
            .should('have.text', 'My Account')
            .xpath(selectors.ulFooterMyAccount)
            .find('li')
            .should('have.length', 5)
            .should('contain', 'New Account Application')
            .should('contain', 'Order History')
            .should('contain', 'Logout')
            .should('contain', 'Pay Your Bill Online')

            .get('.help-support')
            .find('h4')
            .should('have.text', 'Help & Support')
            .xpath(selectors.ulFooterHelpAndSup)
            .find('li')
            .should('have.length', 4)
            .should('contain', 'FAQs')
            .should('contain', 'Our Branches')
            .should('contain', 'Terms of Sale')
            .should('contain', 'Terms for Suppliers');

    }

    clickNewAccountApplication() {
        cy.contains('New Account Application').click();
    }

    clickApply(){
        cy.contains('Apply').click()
    }

    verifyPopupDisplayed() {
        cy.get('new-application-popup').should('be.visible'); 
    }

    clickSalesTaxStateForms() {
        cy.contains('Sales Tax State Forms').click();
    }


    verifyGoogleTranslator() {
        cy.xpath(selectors.googleTranslator).should("be.visible")
            .xpath(selectors.googleTranslatorImg).should("be.visible").realHover('mouse');

    }

    verifyMainSlider(){
        cy.get(selectors.sliderMain).should("exist")
    }

    verifyFeaturedProductsHeader(){
        cy.verifyLabelAndScroll('p', 'Featured Products');
    }

    verifyAndClickFeatureProductsTabs(){
        cy.get('.feature-tab-sub-heading').within(()=>{
            cy.get('.feature-tab-titles').eq(0).should('have.text','Sale').click()
            //sometimes will not show below tab as client changes
            cy.get('.feature-tab-titles').eq(1).should('have.text','Featured').click()
            cy.get('.feature-tab-titles').eq(2).should('have.text','Best Seller').click()
            cy.get('.feature-tab-titles').eq(3).should('have.text','Latest').click()
        })
    }

    verifyItemBlockOnFeatureProductsTab(){
        cy.get('.slide.selected .product-info-wrapper').eq(0).within(()=>{
            cy.get('.feature-brand-title').should('be.visible')
            cy.get('.sku-text').should('be.visible')
            cy.get('.price-block').should('be.visible')
            cy.get('#item-qty').should('be.visible')
            cy.get('.feature-add-to-cart-button').should('be.visible')
            cy.get('[title="Add to favorites"]').should('be.visible')
        })
    }

    clickAddToCartOnItemBlock(index){
        cy.get('.slide.selected .product-info-wrapper').as('product').should((ele)=>{
            expect(ele).to.be.visible
        })

        cy.get('@product').eq(index).within(()=>{
            cy.get('.feature-add-to-cart-button').scrollIntoView().click()
        })
    }

    verifyQuantityBoxOnError(){
        cy.get('.feature-add-to-cart-input-error').should((error)=>{
            expect(error).to.be.visible
        })
    }

    typeQuantityBoxFeaturedProduct(index,value){
        cy.get('.slide.selected .product-info-wrapper').eq(index).within(()=>{
            cy.get('#item-qty').type(value)
        })
    }

    verifyQuantityBoxFeaturedProduct(index,expectedvalue){
        cy.get('.slide.selected .product-info-wrapper').eq(index).within(()=>{
            cy.get('#item-qty').should('have.value',expectedvalue)
        })
    }

    clickAddToFavouritesButton(index){
        cy.get('.slide.selected .product-info-wrapper').eq(index).within(()=>{
            cy.get('[title="Add to favorites"]').click()
        })
    }

    verifyButtonChangeToInMyFavourite(index){
        cy.get('.slide.selected .product-info-wrapper').eq(index).within(()=>{
            cy.get('[title="In my favorites"]').should((btn)=>{
                expect(btn).to.be.visible
            })
        })
    }

    clickInMyFavouriteButton(index){
        cy.get('.slide.selected .product-info-wrapper').eq(index).within(()=>{
            cy.get('[title="In my favorites"]').click()
        })
    }

    verifyFeaturedProductsSlider(){
        cy.get(selectors.sliderFeaturedProducts).should("exist")
    }

    clickFeaturedSliderNextButton(){
        cy.get('.featured-carousel-control-next')
          .should('be.visible')
          .click()
    }

    clickFeaturedSliderPreviousButton(){
        cy.get('.featured-carousel-control-prev')
          .should('be.visible')
          .click().wait(500)
    }

    verifyFeaturedSaleProductsAvailable(){
        cy.get('.feature-item-view').then((ele)=>{
            if(ele.find('.featured-item-sale').length){
                cy.get('.featured-item-sale').should('be.visible')
            }
            else{
                cy.log('sales items are not availble')
            }
        })
          
    }

    clickMainSliderNextButton(){
        cy.get(selectors.linkMainSliderNext).click({force: true})
    }

    verifyMiddleCards(){
        cy.get(selectors.linkGovernement).should("be.visible")
        cy.get(selectors.linkCatalogs).should("be.visible")
        cy.get(selectors.linkMachinery).should("be.visible")
    }

    verifyAndClickBarCodeScan(){
        cy.get(selectors.linkBarCodeScan).should("be.visible").click()
    }

    clickShippingAddress(){
        cy.waitForStableDOM()
        cy.get(selectors.linkShippingAddress).as('linkShippingAddress').should((ele)=>{
            expect(ele).to.be.visible
        })
        cy.get('@linkShippingAddress').click()
    }
    
}

export default HomePage;