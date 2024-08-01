
import selectors from '../support/selectors.js';

class MyFavoritesPage{

    verifyNavigateToFavoritePage(){
        cy.verifyNavigation('/myaccount/myfavorites')
    }

    // getAddToCartButtonForItem(itemcode,btnText="Add to cart"){
    //     const x = cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/following-sibling::tr[2]//button[*[contains(.,"${btnText}")]]`)
    //     console.log('xxxxxxxxx', x)
    //     cy.log("ssssss",x)
    // }

    verifyAndClickSortFilter(index,option){
        cy.get('[name="selectList"]').eq(index)
          .should('be.visible')
          .select(option)
    }

    clickFavouriteItemImage(itemid){
        cy.get(`img[alt="${itemid}"]`).click()
    }

    verifyItemExistOnFavPage(itemcode){
        cy.get("tbody",{timeout:10000}).contains('p',itemcode).should("be.visible")
    }

    getAddToCartButtonForItem(itemcode,btnText="Add to cart"){
        return `//tr[td[contains(.,"${itemcode}")]]/following-sibling::tr[2]//button[*[contains(.,"${btnText}")]]`
    }

    clickOnCategory(){
        cy.xpath(selectors.btnCategory).click();
    }

    clickOnCategoryType(categoryType){
        cy.xpath(`//*[@class='side-filter-list collapse show']//input[@name="${categoryType}"]`).click({ force: true });
    }

    clickOnBrands(){
        cy.xpath(selectors.btnBrands).click();
    }

    clickOnSubCategory(){
        cy.xpath(selectors.btnSubCategory).click();
    }
    
    verifyCategories(expectedcategory){
     
        cy.get('ul.side-filter-list.collapse.show') 
        .should('have.length', 1) 
        .find('li')
        .should('contain', expectedcategory) 
        //.should('contain', 'Abrasives') 
        //.should('have.length', 2)        
    }

    clickOnRemove(){
    
        cy.get(selectors.btnRemove).eq(0).click();
    }

    clickOnRemoveOfAllFavoriteItems(){
        cy.get('.purchased-items-table').should((table)=>{
            expect(table).to.be.visible
        })
        //cy.get(selectors.btnRemove).should('be.visible').click({ multiple: true });
        cy.get('.purchased-items-table').then(($el) => {
            if ($el.find(selectors.btnRemove).length) {
            // Element exists, do something
                //cy.get(selectors.btnRemove,{timeout:10000}).click({ multiple: true });
                cy.get(selectors.btnRemove,{timeout:10000}).each(($el, index) => {
                    cy.get($el)
                      .click()
                }) 
                //wait until remove notiifcations
                cy.wait(5000)
            } else {
            // Element does not exist, do something else
                cy.log("No items in favourite page-no need to clear data prior tc")
            }
            });
    }

    //TOdo-check this working or not
    verifyToastMessage(){
        cy.get('.Toastify__toast').should('be.visible')
    }

    //TODO-remove hardcode
    clickOnRemoveByItem(itemcode){
        cy.xpath(`//p[@title='${itemcode}']//following::tr[2]//button[@title='remove']`).click()
    }

    clickOnViewItemAttribute(){
        cy.xpath(selectors.lnkViewItemAttribute).eq(0).click();
    }

    verifyAndClickOnHideItemAttribute(){
        cy.xpath(selectors.lnkHideItemAttribute)
        .eq(0)
        .scrollIntoView()
        .should("have.text", "Hide item attributes")
        .click();
    }

    clickOnShowMyPrice(itemcode){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/td[@class="price-breakdown"]//*[contains(text(),'Show my price')]`).click();
    }

    enterQuantity(itemcode,quantity){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/td[@class="qty-rw"]//input`).type(quantity)
    }

    verifyQuantityValue(itemcode,expectedvalue){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/td[@class="qty-rw"]//input`).should('have.value',expectedvalue)
    }

    verifyAddToCartIsEnabled(itemcode){
        //this?.getAddToCartButtonForItem(itemcode)?.should('not.be.disabled');
        cy.xpath(this.getAddToCartButtonForItem(itemcode)).should('not.be.disabled');
    }

    clickAddToCart(itemcode){
        //this?.getAddToCartButtonForItem(itemcode)?.click();
        cy.xpath(this.getAddToCartButtonForItem(itemcode)).click()
    }

    clickChangeShippingOptions(itemcode,linkText){
        cy.xpath(`//tr[td[contains(.,"${itemcode}")]]/following-sibling::tr[2]//*[contains(text(),"${linkText}")]`).should('be.visible').click()
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
                cy.get(selectors.ddShippingOptionSize).should('include.text','Same Day Shipping')
            }
            else if(stockStatus=='Backorder Everything'){
                cy.step('If its Backordered same day delivery option should not be available for "Backorder Everything" option')
                cy.get(selectors.ddShippingOptionSize).should('not.include.text','Same Day Shipping')

            }
          })
    
          
    }

    

}

export default MyFavoritesPage;