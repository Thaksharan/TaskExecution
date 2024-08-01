import selectors from '../support/selectors.js';

class ShippingPaymentPage{
    
    clickBackBtn(){
        cy.get(selectors.btnBack).click()
    }

    clickAddNewAddress(){
        cy.get(selectors.linkAddNewAddress).click()
    }

    clickSelectAnotherAddress(){
        cy.get(selectors.linkSelectAnotherAddress).click()
    }

    verifySelectAnotherAddrespopup(){
        cy.contains('.modal-header','Change Shipping Address').wait(5000)
    }

    clickAddressInPopup(addressLine){
        cy.get(selectors.divAddressBlock).should((items)=>{
            expect(items).to.be.visible
        })
        cy.contains(selectors.divAddressBlock,addressLine,{timeout:10000}).within(()=>{
          //worked one
         // cy.get('[for="stAddress"]').click()
          cy.get(selectors.rdoAddress,{timeout:10000}).check({force:true})
        //   cy.get('span')
        //     .click()
            //.should('be.checked')
        })
          
    }

    clickConfirmBtnInPopup(){
        cy.contains('button','Confirm').click().wait(1000)
    }

    verifySelectedAddressDisplayed(addressLine){
        cy.contains(selectors.lblDisplayedAddress,addressLine)
    }

    verifyDefaultEmailAddressInField(defaultEmail){
        cy.get(selectors.txtDefaultEmail).should('have.value',defaultEmail)
    }

    typeEmailAddressInField(email){
        cy.get(selectors.txtDefaultEmail).clear().type(email)
    }

    typeAttnInField(attn){
        cy.get(selectors.txtAttn).clear().type(attn).should('have.value',attn)
    }

    typeDriverNotesInField(driversNotes){
        //cy.get(selectors.txtDriverNotes).type(`{selectall}{enter}${driversNotes}`)
        cy.get(selectors.txtDriverNotes).focus().clear().wait(500).type(driversNotes)
          //.should('have.text',driversNotes)
    }

    clickAddNewCard(){
        
        cy.get(selectors.linkAddNewCard).click({force:true})
    }

    //credit card popup methods
    verifyAddCreditCardPopup(){
        cy.contains('.modal-header','Add Credit Card').should('be.visible')
    }

    //credit card popup methods
    fillCreditCardName(cardName){
        cy.get('#cardName').type(cardName).should('have.value',cardName)
    }

    //credit card popup methods
    fillCreditCardNumber(cardNo){     
        cy.get('.ifram-loader').should('not.exist')
        //cy.contains('title','Loading').should('not.exist')
        // This will verify that the iframe is loaded to any page other than 'about:blank'
        cy.frameLoaded("#tokenframe")

        cy.get("#tokenframe").then(function($iFrame1){
            const iframe2 = $iFrame1.contents().find('#tokenframe')
            cy.wrap(iframe2).as('iframe2Ref')
            cy.get('@iframe2Ref').then(function($iFrame2){
                const iFrame2Contents = $iFrame2.contents().find('body')
                cy.wrap(iFrame2Contents).find("input#ccnumfield").type(cardNo)
            })
        })
          
        
    }

    //credit card popup methods
    fillCreditCardExpiryDate(expiryDate){
        cy.get('#expiryDate').type(expiryDate)
    }

    //credit card popup methods
    checkSaveForFutureOptionOnCardPopup(){
        cy.get('#saveFuture').check({force:true}).should('be.checked')
    }

    //credit card popup methods
    clickSubmitButtonOnCardPopup(){
        cy.get('.red-btn[title="Submit"]').as('submitBtn')
        cy.get('@submitBtn').should((btn)=>{
            expect(btn).to.be.not.disabled
        })
        //   .should('be.visible')
        cy.get('@submitBtn').click()
    }

    verifyAddedCardDisplayed(cardName){
        //cy.scrollDown(0,600);
        cy.contains('div.card-body',cardName).scrollIntoView().should('be.visible')
    }

    verifyCardNotDisplayed(cardName){
        cy.contains('div.card-body',cardName).should('not.exist')
    }

    selectAddedCard(cardName){
        cy.contains('div.card-body',cardName).find('input[type="radio"]').eq(0).click({force:true})
    }

    clickDeleteCard(cardName){
        cy.contains('div.card-body',cardName).find('a img').eq(0).click()
    }

    verifyDeleteCardPopup(){
        cy.contains('.modal-body','Are you sure you want to delete ?').should('be.visible')
    }

    clickCancelOnDeleteCard(){
        cy.contains('button','Cancel').click()
    }

    clickConfirmOnDeleteCard(){
        cy.contains('button','Confirm').click()
    }

    selectBillNowPaymentOption(){
        cy.contains('div.card-body','BILL NOW OPEN').find('input[type="radio"]').eq(0).click({force:true})
    }

    clickContinueOrderButton(){
        cy.get('[title="CONTINUE"]').should('be.visible').click()
    }

}

export default ShippingPaymentPage;