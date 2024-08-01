import ManageUsersPage from "../../PageObjects/ManageUsersPage";
//import MyOrdersPage from "../../PageObjects/MyOrdersPage";
//import MyPurchasedItemsPage from "../../PageObjects/MyPurchasedItemsPage";

describe('Manage Users Tests',()=>{
    const manageUsers= new ManageUsersPage()

    //Access data through hooks for multiple it blocks
    let shipping_test_data
    before(()=>{
        cy.fixture(Cypress.env("fixtureFolder") +'/shipping_data.json').then((data)=>{
            shipping_test_data=data
        })
    })

    beforeEach(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()
    })

    it('WLC-TC-411 Verify the Personal navigation section functionalities',()=>{
        cy.clickOnMainNavTab('User Management')
        manageUsers.verifyManageUsersPageHeader()

        cy.step('Click on Personal Navigation Tab')
        manageUsers.clickPersonalNavigationTab()
        manageUsers.verifyPersonalNavigationSettingsPageHeader()
        manageUsers.verifyAccountFeautures()
        manageUsers.verifyLoginSettings()

        cy.step('Click on Manage address Button')
        manageUsers.clickManageAddressBtn()
        manageUsers.verifyCompanyProfilePageHeader()
        manageUsers.verifyBillingAddress()
        manageUsers.verifyShippingAddress()
        //manageUsers.verifyPrimaryAddress('Brea, CA, 92821')

        cy.step('verify Minimum One Primary Address Available')
        manageUsers.verifyMinimumOnePrimaryAddressAvailable() 

        cy.step('Click on add new shipping address')
        manageUsers.addNewShippingAddress('Test2','Test2 street,South','California','AL','11010','011-111-1111')
        manageUsers.verifySavedAddressAvailble('Test2 street,South')

        cy.step('Click set default option under the address')
        manageUsers.clickDefaultOptionOnAddress('Test2 street,South')
        manageUsers.verifyDefaultAddress('Test2 street,South')

        cy.step('Click Delete icon on of the Default address')
        manageUsers.clickDeleteAddress('Test2 street,South')
        manageUsers.verifyCantDeleteDefaultAddressMsg()

        cy.step('change default address to primary address again')
        manageUsers.clickDefaultOptionOnAddress(shipping_test_data.default_shipping_address)
        manageUsers.verifyDefaultAddress(shipping_test_data.default_shipping_address)
        //then click delete-need to hv delay
        //cy.wait(5000)

        cy.step('edit ShippingAddress of added address')
        manageUsers.clickEditShippingAddressicon('Test2 street,South')
        manageUsers.editShippingAddress('ABC','TestABC street,South','New York','AK','00010','061-234-7456')
        manageUsers.verifyShippingAdressUpdateMsg()

        cy.step('Click Delete icon on of the NON Default address')
        //use edited new addres line as data here
        manageUsers.clickDeleteAddress('TestABC street,South')
        
       // manageUsers.verifyAddressRemoved('Test2 street,South')

    
    })
})