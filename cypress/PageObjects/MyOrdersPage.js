import selectors from '../support/selectors.js';

class MyOrdersPage {

    verifyMyOrderPageHeader(){
        cy.contains('h2','My Orders',{timeout:10000}).should("be.visible");
    }

    searchbyOrderNumber(orderNumber){
        cy.get(selectors.txtSearchOrders).type(orderNumber)
        cy.get(selectors.imgSearchOrders).click({force:true})

    }

    verifyOrderNoInTable(orderNumber){
        cy.contains('.divTableCell p',orderNumber).should('be.visible')
    }

    verifyFilterOrderInTable(orderType){
        cy.get(selectors.lblOrderTypes)
          .then($els => {
          const count = $els.length
          cy.wrap($els).should('have.text', orderType.repeat(count))  
          })
    }

    clickAOrderInTable(){
        cy.get(selectors.lblOrderTypes).eq(0).click()

    }

    verifyNoRecordsLabel(){
        cy.contains('h3','No records found.')
    }

    setDuration(range){
        cy.selectDropdown(selectors.ddDurationOrders,range)
    }

    clickSearchOrderButton(){
        cy.get(selectors.btnSearchOrders).click()
    }

    clickOrderType(orderType){
        cy.contains(selectors.chkOrderType,orderType).find('input').click({force:true})
    }

    clickResetButton(){
        cy.get(selectors.btnReset).click()
    }

    verifyAfterResetState(){
        cy.get(selectors.txtSearchOrders).should('have.value', '')
    }

    verifyBackMyOrdersButton(){
        cy.contains('button','Back my orders').should('be.visible')
    }

    clickBuyAgainButton(){
        cy.contains('button','Buy Again').click()
    }

    verifyAddToCartDialog(){
        cy.contains('h1.modal-title','Add to Cart').should('be.visible')
    }

    enterItemQuantityInAddToCartDialog(quantity){
        cy.get(selectors.txtQuantityOrders).type(quantity)
    }

    clickAddToCartOnDialog(){
        cy.contains('.red-btn','ADD TO CART').should('be.visible').click()
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

export default MyOrdersPage;