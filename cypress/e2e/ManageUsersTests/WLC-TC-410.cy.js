import ManageUsersPage from "../../PageObjects/ManageUsersPage";
//import MyOrders from "../../PageObjects/MyOrders";
//import MyPurchasedItems from "../../PageObjects/MyPurchasedItems";

describe('Manage Users Tests',()=>{
    const manageUsers= new ManageUsersPage()
    const randomInteger = Math.floor(Math.random() * 101);

    //Access data through hooks for multiple it blocks
    // let user_test_data
    // before(()=>{
    //   cy.fixture(Cypress.env("fixtureFolder") +'/validLogin.json').then((data)=>{
    //    user_test_data=data
    //   })
    // })

    beforeEach(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.verifySiteLoaded()
    })

    it('WLC-TC-410 Verify the Manage user page functionalities',()=>{
        cy.clickOnMainNavTab('User Management')
        manageUsers.verifyManageUsersPageHeader()

        cy.section('verify Update your profile section')
        manageUsers.verifyProfileEmail(Cypress.env("username"))
        //manageUsers.verifyProfilePermission('ADMIN')
        manageUsers.verifyProfilePermission(Cypress.env("profile_permission"))
        manageUsers.verifyProfileStatus(Cypress.env("profile_status"))

        cy.step('Click on "Open" option under the update your profile')
        manageUsers.clickProfileOpenButton()
        manageUsers.verifyMandatoryFieldsOfProfile()
        manageUsers.verifyDisabledFieldsOfProfile()

        cy.step('Edit fields & update fail')
        manageUsers.clearLastName()
        manageUsers.clickUpdateButtonOfProfile()
        manageUsers.verifyProfileUpdateFailMsg()

        cy.step('Edit fields & update success')
        manageUsers.editLastName('Test'+randomInteger)
        manageUsers.clickUpdateButtonOfProfile()
        manageUsers.verifyProfileUpdateSuccessMsg()
        manageUsers.verifyLastName('Test'+randomInteger)

        cy.step('Click "Close" ')
        manageUsers.clickProfileOpenButton()

        cy.section('verify User Requests and current users sections')
        manageUsers.verifyNewUserRequestsApprove()
        manageUsers.verifyCurrentUsersOnAccount()      
    })
})