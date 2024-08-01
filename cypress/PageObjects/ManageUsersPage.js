import selectors from "../support/selectors";

class ManageUsersPage{

    verifyManageUsersPageHeader(){
        cy.contains('h2','Manage Users',{timeout:10000}).should("be.visible");
    }

    verifyProfileEmail(expectedEmail){
        cy.xpath(selectors.lblProfileEmail)
          .should('have.text',expectedEmail)
    }

    verifyProfilePermission(expectedPermission){
        cy.xpath(selectors.lblProfilePermission)
          .should('have.text',expectedPermission)
    }

    verifyProfileStatus(expectedStatus){
        cy.get(selectors.lblProfileStatus).should('have.text',expectedStatus)
    }

    verifyNewUserRequestsApprove(){
        cy.contains('h2', 'New User Requests To Be Approved').should('be.visible')
    }

    verifyCurrentUsersOnAccount(){
        cy.verifyLabelAndScroll('h6', 'Current Users On This Account')
    }

    clickProfileOpenButton(){
        cy.get(selectors.btnProfileOpen).click()
    }

    verifyMandatoryFieldsOfProfile(){
        cy.get(selectors.lblFirstName).should('have.text','First Name*')
        cy.get(selectors.lblLastName).should('have.text','Last Name*')
        cy.get(selectors.lblPermission).should('have.text','Permission*')
    }

    verifyDisabledFieldsOfProfile(){
        cy.get(selectors.ddPermission).should('be.disabled')
        cy.get(selectors.ddStatus).should('be.disabled')
    }

    editLastName(updatedLastName){
        cy.get(selectors.tfLastName)
          .scrollIntoView()
          .clear()
          .type(updatedLastName)
          .should('have.value',updatedLastName)
    }

    clearLastName(){
        cy.get(selectors.tfLastName).clear()
    }
    
    verifyLastName(updatedLastName){
        cy.get(selectors.tfLastName).should('have.value',updatedLastName)
    }

    clickUpdateButtonOfProfile(){
        cy.contains('button', 'Update').click().wait(500)
    }

    verifyProfileUpdateSuccessMsg(){
        //cy.wait(3000)
        // cy.intercept('https://wurthlac.com/api/am/manage_users').as('update')
        // cy.wait('@update')
        cy.contains('.alert','Your profile has been successfully updated.').as('successAlert').scrollIntoView()
        cy.get('@successAlert').should('be.visible')
    }

    verifyProfileUpdateFailMsg(){
        cy.contains('.alert','"Last Name" is not allowed to be empty').scrollIntoView().should('be.visible')
    }

    clickPersonalNavigationTab(){
        cy.get(selectors.tabPersonalNavigation).should('be.visible').click()
    }

    verifyPersonalNavigationSettingsPageHeader(){
        cy.contains('h2','Personal Navigation Settings',{timeout:10000}).should("be.visible");
    }

    verifyAccountFeautures(){
            cy.get(selectors.lblAccountFeatures).eq(0).should('contain.text',"My Shipping Address")
            cy.get(selectors.lblAccountFeatures).eq(1).should('contain.text',"Company Logo")
            cy.get(selectors.lblAccountFeatures).eq(2).should('contain.text',"Truck Route Details")
            cy.get(selectors.lblAccountFeatures).eq(3).should('contain.text',"Will Call/Home Branch Location")
          
    }

    verifyLoginSettings(){
        cy.contains('strong', 'Login Settings').should('be.visible')
    }

    clickManageAddressBtn(){
        cy.contains('button', 'manage address').click()
    }

    verifyCompanyProfilePageHeader(){
        cy.contains('h4','Company Profile',{timeout:10000}).should("be.visible");
    }

    verifyBillingAddress(){
        cy.contains('h5', 'Billing Address').should("be.visible");
    }

    verifyShippingAddress(){
        cy.contains('h4','Shipping Addresses').should("be.visible")
    }

    //user can add primary address again, so with addres cannot uniquely identify primary address
    //also there can be multiple primary addresses(all address in login setaddress are primary)
    // verifyPrimaryAddress(primaryAddress){
    //     cy.contains('.row',primaryAddress).find('.primary-label').should('have.text','Primary')
    //     //User should not be able to edit,delete Primary address details
    //     cy.contains('.row',primaryAddress).find('div.add-new-address img').should('not.exist')
    //     cy.contains('.row',primaryAddress).find('img[alt="Delete"]').should('not.exist')
    // }

    verifyMinimumOnePrimaryAddressAvailable(){
        cy.get('.address-card .row').find('.primary-label').should('have.text','Primary')
    }

    clickEditShippingAddressicon(addressLine){
        //cy.get(selectors.imgEditShippingAddress).eq(0).click()
        cy.contains('.row',addressLine).find(selectors.imgEditShippingAddress).click()
    }

    // verifyShippingAddressdialog(){
    //     cy.contains('.modal-header','Shipping Address').should('be.visible')
    // }

    // typeDetailsOnShippingDialog(attn,addressLine,city,state,zipCode,phoneNo){
    //     cy.get('#name').clear().type(attn)
    //     cy.get('#addressLine').clear().type(addressLine)
    //     cy.get('#city').clear().type(city)
    //     cy.get('#states-autocomplete').clear().type(state)
    //     cy.get('#zipCode').clear().type(zipCode)
    //     cy.get('#phoneNo').clear().type(phoneNo)
    // }

    // clickDoneOnShippingDialog(){
    //     cy.contains('Done').click()
    // }

    editShippingAddress(attn,addressLine,city,state,zipCode,phoneNo){
        //this.clickEditShippingAddressicon(addressLine)
        cy.verifyShippingAddressdialog()
        cy.typeDetailsOnShippingDialog(attn,addressLine,city,state,zipCode,phoneNo)
        cy.clickDoneOnShippingDialog()
        //this.verifyShippingAddressdialog()
        //this.typeDetailsOnShippingDialog(attn,addressLine,city,state,zipCode,phoneNo)
        //this.clickDoneOnShippingDialog()
    }

    verifyShippingAdressUpdateMsg(){
        cy.contains('.alert','Shipping address updated.').should('be.visible')
    }

    clickAddNewShippingAddress(){
        cy.get(selectors.linkAddNewAddressUM).click()
    }

    addNewShippingAddress(attn,addressLine,city,state,zipCode,phoneNo){
        this.clickAddNewShippingAddress()
        cy.verifyShippingAddressdialog()
        cy.typeDetailsOnShippingDialog(attn,addressLine,city,state,zipCode,phoneNo)
        cy.clickDoneOnShippingDialog()
        // this.verifyShippingAddressdialog()
        // this.typeDetailsOnShippingDialog(attn,addressLine,city,state,zipCode,phoneNo)
        // this.clickDoneOnShippingDialog()
    }

    verifySavedAddressAvailble(addressLine){
        cy.contains('.row',addressLine).should('be.visible')
    }

    clickDefaultOptionOnAddress(addressLine){
        cy.contains('.row',addressLine,{ matchCase: false }).find(selectors.linkSetDefault).click()
    }

    verifyDefaultAddress(addressLine){
        cy.contains('.row',addressLine).find(selectors.lblDefault).should('have.text','Default')
    }

    clickDeleteAddress(addressLine){
        cy.contains('.row',addressLine).find(selectors.imgDeleteAddress).click()
    }

    verifyCantDeleteDefaultAddressMsg(){
        cy.contains('.modal-content','Cannot delete default address').should('be.visible')
        cy.get(selectors.btnOk).click()
    }

    verifyAddressRemoved(addressLine){
        cy.contains('.row',addressLine).should('not.exist')
    }




}

export default ManageUsersPage;