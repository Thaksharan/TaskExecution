import selectors from '../support/selectors.js';

class ProductPage
{
    // verifyNavigateToProductPage(){
    //     cy.verifyNavigation('/myaccount/myfavorites')
    // }

    clickViewItem(){
        cy.get(selectors.btnViewItem).click();
    }

    verifyAddToCart(){
        cy.get('button').contains(selectors.btnAddToCart).first();
    }

    verifyAddToFavoritesButton(){
        cy.verifyButtonText('ADD TO FAVORITES')
    }

    verifyAddedToFavoritesButton(){
       cy.verifyButtonText('ADDED TO FAVORITES')
    //    cy.contains('button','ADDED TO FAVORITES')
    //      .should((btn)=>{
    //         expect(btn).to.be.visible()
    //         expect(btn).to.have.class('.green-border-btn')
    //      })
    }

    clickAddedToFavouriteButton(){
        cy.contains('button','ADDED TO FAVORITES').click()       
    }

    verifyProductName(productName){
        cy.get(selectors.lblProductName).contains(productName).should("be.visible");
    }

    verifyProductNameLabelVisible(){
        cy.get(selectors.lblProductName).should((ele)=>{
            expect(ele).to.be.visible
        });
    }

    verifyShippingOption(){
        //shipping options view is loaded
        cy.get(selectors.divShippingOptions).should((lbl)=>{
            expect(lbl).to.be.visible
        })
        
        //shipping options dropdown
        cy.get(selectors.ddShippingOptionSize).should((lbl)=>{
            expect(lbl).to.be.visible
        })

    }

    clickCloseInImage(){
        cy.xpath(selectors.btnCloseInImage).click();
    }
    
    clickAddToCart(){
        cy.get('button').contains(selectors.btnAddToCart).first().click();;
    }
    
    //main product
    clickAddToFavorites(){
        this.verifyAddToFavoritesButton()
        cy.selectButtons('ADD TO FAVORITES')
    }

    verifyAddToCartIsEnabled(){
        cy.get('button').contains(selectors.btnAddToCart,{matchCase:false}).should('not.be.disabled');
    }

    verifyAddToCartIsDisabled(){
       // cy.get('button').contains(btnAddToCartText).should('be.disabled');
        cy.get('.btn-add-to-cart').each(($li)=>{
            expect($li).to.be.disabled
        })
    }
    
    // verifyViewCartPopup(){
    //     cy.xpath(selectors.btnViewCart).should("be.visible");
    // }

    // clickViewCartOnPopup(){
    //     cy.xpath(selectors.btnViewCart).click();
    // }
    
    clickOnPriceBreakdownInAccesories(itemid){
        //cy.xpath(selectors.drpPriceBreakdownInAccesories).scrollIntoView({ timeout: 5000 }).click( {force: true});
        cy.contains('.product-info-row',itemid)
         .scrollIntoView()
         .find('.price-breakdown div').eq(0).click()
        
    }
    
    clickAddToFavoritesImageInAccesories(itemcode,expectedStateOfBtn){
        //let btnitemcode="btn"+itemcode
        cy.xpath(`//button[@id='btn${itemcode}']/following-sibling::button[@title='${expectedStateOfBtn}']`).click({force: true});
      
    }
    


    changeShippingOptionsAccesories(itemid){
        cy.xpath(`//*[@id="btn${itemid}"]/following::a/span[@title="Change shipping option"]`).click();
        
    }

    enterQtyInAccessories(itemid,qty){
        cy.get(`#txt${itemid}`).should((input)=>{
            expect(input).to.be.visible
        })
        cy.get(`#txt${itemid}`).type(qty);
        
    }

    selectBreaCAInAccessories(index){
        cy.xpath(selectors.drpBackordered).select(index,{force: true});
        
    }

    verifyVariation(){
        //cy.xpath(selectors.lblVariation).scrollIntoView({ timeout: 5000 }).should("be.visible");
        cy.get('#variation').scrollIntoView().find('.related-table').within(()=>{
            cy.get('.tr-color td strong').eq(0).should('be.visible')
        })
    }

    verifySelectedVariationFromDropDown(itemid){
        cy.get('.itemSkuCod').find('option:selected').should('have.value', itemid);
    }

    compareVariationFromDropDownAndVariationInSection(itemid){
        // let wordsSplit,variationDropdown;
        // cy.xpath(selectors.drpItemNoOption)
        // .invoke('text')
        // .then((text) => {
        //     //se901 in dropdoen dont hv () so no need to split now
        //     variationDropdown=text
        //     if(text.includes('( ')){
        //         wordsSplit = text.split('( ')[1];
        //         variationDropdown=wordsSplit.split(' )')[0];
        //     }

        // cy.xpath(selectors.lblVariation).should('have.text', variationDropdown);
        // });
        cy.get('#variation').find('.related-table').within(()=>{
            //use exist due to in list item maybe not show on screen
            cy.contains('.tr-color td strong', itemid).should('exist')
        })

    }

    clickAddToFavoritesImageInVariations(itemid){
        //cy.xpath(selectors.imgAddToFavoritesVariations).scrollIntoView({ timeout: 5000 }).click({force: true});
        cy.xpath(`//*[@id="btn${itemid}"]/following-sibling::button[@title='Add to favorites']`).scrollIntoView().click({force: true});
    }

    clickOnPriceBreakdownInVariations(itemid){
        //cy.get('#variation').scrollIntoView()
       // cy.xpath(selectors.drpPriceBreakdownVariations).should("be.visible").click( {force: true});
       cy.contains('.tr-color',itemid)
         .scrollIntoView()
         .find('.price-breakdown div').eq(0).click()
        
    }

    clickChangeShippingOptionsVariations(itemid){
        cy.xpath(`//*[@id="btn${itemid}"]/following::a/span[@title="Change shipping option"]`).click({force: true});
        
    }


    verifyFirstShippingOptionIsDisabled(){
       // cy.xpath(selectors.drpBackordered).should('be.disabled');
       cy.get('.method-option select').should('be.disabled')
    }

    enterQtyInVariations(itemid,qty){

        cy.xpath(`//*[@id='txt${itemid}']`).should((field)=>{
            expect(field).to.be.visible
        })
        cy.xpath(`//*[@id='txt${itemid}']`).type(qty);
        
    }

    verifyAddToCartInVariationsIsEnabled(itemid){
        cy.get(`#btn${itemid}`).should('not.be.disabled');
    }

    verifyAddToCartInAccesoriesIsDisabled(itemid){
        cy.get(`#btn${itemid}`).should('be.disabled');
    }

    selectBreaCAInVariations(index){
        cy.xpath(selectors.drpBackordered).select(index,{force: true});
        
    }

    clickOnShipFromAlternativeBranch(){
        cy.get(selectors.rdoShipFromAlternative).check( {force: true} );
        
    }

    clickOnShipFromAlternativeBranchVariations(){
        cy.get(selectors.rdoShipFromAlternativeVariation).check( {force: true} );
        
    }

    clickOnShipFromAlternativeBranchAccessories(){
        cy.get(selectors.rdoShipFromAlternativeAccessories).check( {force: true} );
        
    }

    checkWillCallAnyWhere(){
        cy.wait(4000)
        cy.get(selectors.chkWillCallAnywhereSize).check({force:true})
    }
    
    clickAddToCartInVariations(itemid){
        cy.get(`#btn${itemid}`).scrollIntoView().click();
    }
    
    clickAddToCartInAccesories(relatedItemID){
        //cy.get(selectors.btnAddToCartAccesories).scrollIntoView().click({force: true});
        cy.get(`#btn${relatedItemID}`).scrollIntoView().click({force: true})
    }

    verifyHighlightedVariation(){
        cy.xpath("//div[contains(text(),'White')]/..")
        .should('have.class', 'tcolor text-center color-field');
    }

    verifyColorFilterAvailableInVariations(){
        cy.get('#variation').then((section)=>{
            if(section.find('#color').length){
                this.selectValueForFiter('White');
                this.verifyHighlightedVariation();
            }
            else{
                cy.log('color variations not found for this product')
            }
        })
    }

    selectValueForFiter(optionText){
        cy.get('#color').select(optionText,{force: true})
    }

    //select item variation from dropdown
    selectItemvariationFromDropdown(optionText){
        cy.selectDropdown(selectors.drpItemNo,optionText);
  
    }

    selectItemvariationFromDropdownByIndex(index){
        cy.selectDropdown(selectors.drpItemNo,index);
  
    }

    //verify item slections
    verifySelectedItemVariationDropdown(optionText){
        cy.get(selectors.drpItemNo)
          .invoke("val")
          .should("eq", optionText)
    }

    verifyitemManufacturerNo(manufacNo){
        //cy.verifyLabel('.manufacture-no > span',manufacNo);
        cy.contains('.manufacture-no > span',manufacNo).should('be.visible')
    }

    verifyItemPrice(itemPrice){
        cy.verifyLabel('span',itemPrice);
    }

    verifyQuantityLabel(){
        cy.verifyLabel('label','Quantity :');
    }

    verifyMinOrderLabel(){
        cy.verifyLabel('span','Min Order : ');
    }

    verifyLoginToViewPriceBtn(){
        cy.contains('button','lOGIN TO VIEW PRICE AND BUY').should("be.visible");
    }

    clickProductMainImageToZoom(){
        cy.get(selectors.imgProduct).should("be.visible").click()
    }

    // getStockAvailabilityStatus(){
    //     cy.get('.shipping-option-wrapper .custom-control-label span')
    //       .scrollIntoView()
    //       .should('be.visible')
    //       .invoke('text').then((status) => {
    //         let stockStatus=status.trim()
    //         cy.log('Stock Availability Status:', stockStatus )
    //         if(stockStatus=='In Stock'){
    //             cy.step('If its In Stock, Same Day Shipping option should be available for eligible users (Brea, CA users) by default')
    //             cy.get(selectors.ddShippingOptionSize).should('include.text','Same Day Shipping')
    //         }
    //         else if(stockStatus=='Backorder Everything'){
    //             cy.step('If its Backordered same day delivery option should not be available for "Backorder Everything" option')
    //             cy.get(selectors.ddShippingOptionSize).should('not.include.text','Same Day Shipping')

    //         }
    //       })
    
          
    // }

    verifyStockLocationSameDayShipping(){
        //to ue this method user should click change shipping options link first
        cy.get('.shipping-option-wrapper .custom-control-label span')
          .scrollIntoView()
          .should('be.visible')
          .invoke('text').then((status) => {
            let stockStatus=status.trim()
            cy.log('Stock Availability Status:', stockStatus )
            if(stockStatus=='In Stock'){
                cy.get('.method-option span').eq(0).invoke('text').then((shiplocation)=>{
                    let shipsFromLocationOfItem=shiplocation.trim()
                    cy.log('ships From Location Of Item:', shipsFromLocationOfItem )
                    if(shipsFromLocationOfItem=='Brea, CA'){
                        cy.step('If its In Stock, Same Day Shipping option should be available for eligible users (Brea, CA users) by default')
                        cy.get(selectors.ddShippingOptionSize).should('include.text','Same Day Shipping')
                    }
                })
                
            }
            else if(stockStatus=='Backorder Everything'){
                cy.step('If its Backordered same day delivery option should not be available for "Backorder Everything" option')
                cy.get(selectors.ddShippingOptionSize).should('not.include.text','Same Day Shipping')

            }
          })
    
          
    }

    verifyIfCheckOtherBranchesAvailble(){
        cy.get('body').then((bodyElement) => {

            if (bodyElement.find('.stock-unavailable-msg').length > 0) {
                cy.log('Stock Unavailable in Other Branches')
            }
            else if(bodyElement.find('.shipping-view-more button').length > 0){
                cy.log('Stock available in Other Branches')
                cy.contains('button','CHECK OTHER BRANCHES',{matchCase:false}).should('be.visible')
                cy.step('Click on Ship From Alternative Branch(es) option / Other Branch option')
                this.clickCheckOtherBranchesMainProduct()
                this.selectCheckOtherBranchesMainProductOption()
            }
        })
    
    }

    clickCheckOtherBranchesMainProduct(){
        cy.contains('button','CHECK OTHER BRANCHES',{matchCase:false}).click()
    }

    selectCheckOtherBranchesMainProductOption(){
        cy.get(selectors.rdoShipFromAlternative).check( {force: true} );
    }

    selectShippingOptionMainProduct(option){
        cy.selectOptionContaining(selectors.ddShippingOptionSize,option)
    }

    selectShippingOptionVariation(option){
        cy.selectOptionContaining(selectors.ddShippingOptionSize,option)
    }

    typeQuantityOfItem(quantity){
        cy.get(selectors.txtQuantity).should((field)=>{
            expect(field).to.be.visible
        })

        cy.enterText(selectors.txtQuantity,quantity);
    }

    verifyToast(){
        cy.get('.Toastify')
          .should('exist')
          .should('contain', 'Adding item to favorites')
          //.contains('.alert','Adding item to favorites');
    }

    verifySomethingWentWrongError(){
        cy.get('.something-went-wrong').within(()=>{
            cy.contains('.error-header','Oops..!').should('be.visible')
            cy.contains('.error-message','Something Went Wrong').should('be.visible')
            cy.contains('.contact-message','Please contact web support').should('be.visible')
        })
    }

    clickViewItemButtonOnSearchResults(index){
        cy.get('[title="View item"]').eq(index).click()
    }

    performTopSearchAndAddToCartItem(searchTerm,productName){
        cy.searchFromSearchBar(searchTerm);
        this.verifyProductName(productName);
        this.typeQuantityOfItem('1');
        this.clickAddToCart();

    }




    
}

export default ProductPage;