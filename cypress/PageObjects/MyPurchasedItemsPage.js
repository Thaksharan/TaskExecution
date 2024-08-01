import selectors from '../support/selectors.js';

class MyPurchasedItemsPage{

    verifyMyPurchasedItemsPageHeader(){
        cy.contains('h2','My Purchased Items',{timeout:10000}).should("be.visible");
    }

    setDuration(range){
        cy.selectDropdown(selectors.ddDuration,range)
    }

    setDateRange(){
        // cy.get(selectors.btnDatePick).eq(0).type('07/17/2023',{force:true}).type('{enter}')
        // cy.wait(4000)
        // cy.get(selectors.btnDatePick).eq(1).type('07/17/2023')
        // cy.wait(3000)
        // cy.contains('Search').click()
        // cy.wait(8000)

        // cy.get(selectors.btnDatePick).eq(0).then(($ele) => {
        //     const nazwy = $ele.text().trim().replace('10/10/2022','07/17/2023')
        //     cy.log(nazwy)//prints label texts one by 
        //     cy.get(selectors.btnDatePick).eq(0).type('{enter}')
        //   })
        // cy.wait(8000)

        //this code works, can select date
        cy.get(selectors.btnDatePick).eq(0).click()
        cy.wait(1000)
        cy.get(`.react-datepicker__day--013`).click()
    }

    clickOnShowMyPrice(itemcode){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/td[@class="price-breakdown"]//*[contains(text(),'Show my price')]`).click();
    }

    clickOnShowMyPriceWithoutID(){
        cy.get('.show-hide-price p').eq(0).click()
    }

    verifyShownPrice(){
        cy.get('.price-block',{timeout:10000}).should('be.visible')
    }

    clickAddToFavouriteBtn(itemcode){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/following-sibling::tr[2]//button`).contains('ADD TO FAVORITES').click()
    }

    clickAddToFavouriteBtnWIthoutID(){
        cy.get('[title="Add to favorites"]').eq(0).click()
    }

    // verifyAddItemToFavouriteToast(){
    //     cy.get('.Toastify__toast-body', {timeout: 10000}).should('have.text','Adding item to favourites')
    // }

    verifyFavBtnTextChangeAfterClick(){
        //btn text should change after click
        cy.verifyButtonText('ADDED TO FAVORITES')
    }

    clickAddedToFav(){
        cy.xpath(selectors.btnAddedToFav).click();
       
    }

    enterQuantity(itemcode,quantity){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/td[@class="qty-rw"]//input`).type(quantity)
    }

    enterQuantityWithoutID(itemIndex,quantity){
        cy.get('.qty-rw input').eq(itemIndex).type(quantity)
    }

    verifyQuantityValue(itemcode,expectedvalue){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/td[@class="qty-rw"]//input`).should('have.value',expectedvalue)
    }

    verifyQuantityValueWithoutID(itemIndex,expectedvalue){
        cy.get('.qty-rw input').eq(itemIndex).should('have.value',expectedvalue)
    }

    getAddToCartButtonForItem(itemcode,btnText="Add to cart"){
        return `//tr[td[contains(.,"${itemcode}")]]/following-sibling::tr[2]//button[*[contains(.,"${btnText}")]]`
    }

    verifyAddToCartIsEnabled(itemcode){
        //this?.getAddToCartButtonForItem(itemcode)?.should('not.be.disabled');
        cy.xpath(this.getAddToCartButtonForItem(itemcode)).should('not.be.disabled');
    }

    clickAddToCart(itemcode){
        //this?.getAddToCartButtonForItem(itemcode)?.click();
        cy.xpath(this.getAddToCartButtonForItem(itemcode)).click()
    }

    verifyAddToCartEnabledWithoutID(itemIndex){
        cy.get('.btn-add-to-cart').eq(itemIndex).should('not.be.disabled');
    }

    clickAddToCartWithoutID(itemIndex){
        cy.get('.btn-add-to-cart').eq(itemIndex).click()
    }

    // verifyViewCartPopup(){
    //     cy.xpath(selectors.btnViewCart).should("be.visible");
    // }

    // clickViewCartOnPopup(){
    //     cy.xpath(selectors.btnViewCart).click();
    // }

    clickChangeShippingOptions(itemcode,linkText){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/following-sibling::tr[2]//*[contains(text(),"${linkText}")]`).should('be.visible').click()
    }

    clickChangeShippingOptionsWithoutID(itemIndex){
        cy.get('[title="Change shipping option"]')
          .eq(itemIndex)
          .should('be.visible')
          .click()
    }

    selectShippingOptionVariation(option){
        cy.get('.shipping-details-wrapper').then((ele)=>{
            if(ele.find(selectors.ddShippingOptionSize).length){
                cy.selectOptionContaining(selectors.ddShippingOptionSize,option)
            }
            else{
                cy.log('product item does not have shipping option dropdown')
            }
        })
        
    }

    getStockAvailabilityStatus(){
        cy.get('.shipping-option-wrapper .custom-control-label span')
          .scrollIntoView()
          .should('be.visible')
          .invoke('text').then((status) => {
            let stockStatus=status.trim()
            cy.log('Stock Availability Status:', stockStatus )
            if(stockStatus=='In Stock'){
                cy.step('If its In Stock, Same Day Shipping option should be available for eligible users (Brea, CA users) by default')
                //cy.get(selectors.ddShippingOptionSize).should('include.text','Same Day Shipping')
                cy.get('.shipping-details-wrapper').then((ele)=>{
                    if(ele.find(selectors.ddShippingOptionSize).length){
                        cy.get(selectors.ddShippingOptionSize).should('include.text','Same Day Shipping')
                    }
                    else{
                        cy.log('product item does not have shipping option dropdown')
                    }
                })
            }
            else if(stockStatus=='Backorder Everything'){
                cy.step('If its Backordered same day delivery option should not be available for "Backorder Everything" option')
                cy.get(selectors.ddShippingOptionSize).should('not.include.text','Same Day Shipping')

            }
          })
    
          
    }

    getMinimumQuantityOfItem(){
        let part
        let minimumQty
        cy.get('.qty-rw').eq(0).invoke('text').then((text) => {
            part=text.split('Min:')[1]
            minimumQty=parseInt(part.split('Multiples')[0])
            cy.log(minimumQty)
        })
        return minimumQty
    }

    typeMinQtyOfItem(itemIndex){
        let part
        let minimumQty
        cy.get('.qty-rw').eq(0).invoke('text').then((text) => {
            part=text.split('Min:')[1]
            minimumQty=Number(part.split('Multiples')[0])
            cy.log(typeof minimumQty === "number")
            this.enterQuantityWithoutID(itemIndex,minimumQty)
            this.verifyQuantityValueWithoutID(0,minimumQty)
        })
        
    }

}

export default MyPurchasedItemsPage;