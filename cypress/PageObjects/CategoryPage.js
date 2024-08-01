import selectors from '../support/selectors.js';

class CategoryPage {
    verifyAllShopByCategories() {

        cy.get('#main-cat-53151').should('contain', 'Abrasives')
            .should('have.attr', 'href', '/category/abrasives?catid=53151');
        cy.get('#main-cat-53118').should('contain', 'Adhesives, Caulking & Sealants')
            .should('have.attr', 'href', '/category/adhesives-caulking-sealants?catid=53118');
        cy.get('#main-cat-53931').should('contain', 'Bathroom Hardware & Accessories')
            .should('have.attr', 'href', '/category/bathroom-hardware-accessories?catid=53931');
        cy.get('#main-cat-53178').should('contain', 'Catches & Locks')
            .should('have.attr', 'href', '/category/catches-locks?catid=53178');
        cy.get('#main-cat-53892').should('contain', 'Decorative Hardware & Wood Components')
            .should('have.attr', 'href', '/category/decorative-hardware-wood-components?catid=53892');

    }

    verifyCloseShopByCategory() {
        cy.get(selectors.btnCloseShopByCategoryIcon).should('be.visible');
    }

   

    verifyMaxNumOfProductsPerPage(maxcount) {
        cy.get('.product-item-variations-v')
            .should('have.length', maxcount);
    }

    verifyTopPaginationOfProductList() {
        //cy.get(selectors.divTopNumOfProd).should('have.text', '1 - 20 of 23');
        cy.get(selectors.divNumOfProd).eq(0).should("be.visible");
        cy.get(selectors.divSortBy).eq(0).should("be.visible")
            .and('contain', 'Sort by :')
            .get('#sort').should("be.visible")
        cy.get(selectors.divPerPage).eq(0).should("be.visible")
            .and('contain', 'Per Page :')
            .get('#perpage').should("be.visible")
        cy.get(selectors.divPagination).eq(0).should("be.visible")

    }

    verifyBottomPaginationOfProductList() {
        //cy.get(selectors.divBottomNumOfProd).should('have.text', '1 - 20 of 23');
        cy.get(selectors.divNumOfProd).should("be.visible");
        cy.get(selectors.divSortBy).eq(1).should("be.visible")
            .and('contain', 'Sort by :')
            .get('#sort').should("be.visible")
        cy.get(selectors.divPerPage).eq(1).should("be.visible")
            .and('contain', 'Per Page :')
            .get('#perpage').should("be.visible")
        cy.get(selectors.divPagination).eq(1).should("be.visible")

    }

    clickAndSelectSortBy() {
        cy.get('#sort').should("be.visible").invoke('show')
            .select('Z to A').should('have.value', '0')
    }

    verifyProductImageDisplayed(productName){
        cy.xpath(`//img[@alt='${productName}']`).scrollIntoView().should('be.visible')
    }

    verifyProductBrandDisplayed(productBrand){
        cy.contains("a", productBrand).scrollIntoView().should("be.visible")
    }

    verifyMakeSelectionDropDownDisplayed(productName){
        cy.contains('.product-info',productName).find('.itemSkuCod').should('be.visible')
        //cy.get('.itemSkuCod').should('be.visible')
    }

    selectVariationFromDropDown(productName,optionvalue){
        cy.get(`.product-name[title="${productName}"] + div select`)
          .select(optionvalue,{force:true})
          .should('have.value',optionvalue)
        
    }

    verifyProductVariationsDisplayed(){
        cy.get('.variations-count.var-count').should('be.visible')
    }

    verifyActiveFilterLabel(){
        cy.get('.active-filters-item').scrollIntoView().should('be.visible')
        // cy.get('.active-filters-item').within(()=>{
        //     cy.contains(`${filterCategory} : ${value}`)
        // })
    }

    clickCloseOnActiveFilter(){
        cy.get('.active-filters-item').find('.material-icons').eq(0).click()
    }

    checkFilterUnderAttributeFIlter(attribute,index,item){
        cy.contains('.filter-block',attribute).scrollIntoView()
        cy.get('.filter-block a picture').eq(index).click().wait(1000)
        cy.contains('.filter-block',attribute).within(()=>{
            //wait till items load
            cy.get('.side-filter-list').should((items)=>{
                expect(items).to.be.visible
            })
            //cy.get('.side-filter-list .checkmark').eq(0).click().wait(5000)
            cy.contains('.description',item).click().wait(1000)
        })
    }

    clickResetFilters(){
        cy.get('[title="Reset filters"]').eq(0).click()
    }

    clickViewItemButton(productName){
       // cy.contains('.product-info',productName).find('[title="View item"]').click()
       cy.xpath(`(//*[@title="${productName}"]/following::div/a[@title="View item"])[1]`).click()
    }


    
}

export default CategoryPage;