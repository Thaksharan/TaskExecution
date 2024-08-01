//import signInPage from "../../PageObjects/SignInPage";
import HomePage from "../../PageObjects/HomePage";

describe('Login Tests', () => {
    // const signinpage = new SignInPage();
    const homepage = new HomePage();
    beforeEach(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
 
    })

    it('WLC-TC-422 Verify the Login Remember My Setting Functionality', () => {

        cy.login();
        cy.verifyAccountShippingAddressDisplayed()
        cy.clickOnFirstRadio();
        cy.clickOnRadio();
        cy.step('Click on Remember My Setting')
        //cy.waitForStableDOM()
        cy.checkRememberMySetting()
        cy.verifyRememberMySettingChecked()  
        cy.clickContinueButton()
        cy.verifySiteLoaded()

        //cy.step('Click on Logout')
        //cy.selectItem('View Account & History');
        cy.logout()
        //cy.selectItem('Logout');

        cy.step('Login again to check ')
        //cy.wait(5000)
        cy.login();
        cy.step('Account & Shipping Address popup should not be displayed')
        cy.verifyAccountShippingAddressNotDisplayed()
        //cy.wait(5000)
        cy.verifySiteLoaded()

        cy.step('Click on Shipping Address')
        homepage.clickShippingAddress()
        cy.verifyAccountShippingAddressDisplayed()

        cy.step('Uncheck Remember My Setting')
        cy.uncheckRememberMySetting()
        cy.clickContinueButton()
        cy.wait(3000)
        //page reload hapenning after click continue button
        cy.verifySiteLoaded()

        //since when remember my settings unchecked we get popup i already checked, commented these steps
        // cy.clickLogout()
        // //cy.selectItem('Logout');
        // cy.wait(2000)

        // cy.step('Login again to check ')
        // cy.login();

        // cy.step('Account & Shipping Address popup should be displayed')
        // cy.verifyAccountShippingAddressDisplayed()
        // cy.setAccountShippingAddress()
        // cy.verifyLink("Quick Order")

    })

})