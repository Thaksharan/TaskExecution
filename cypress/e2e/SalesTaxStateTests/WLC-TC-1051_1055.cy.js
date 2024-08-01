import SalesTaxStatesPage from '../../PageObjects/SalesTaxStatesPage.js'
import selectors from '../../support/selectors.js';

describe('Sales Tax Tests',() => {
    const salestaxpage = new SalesTaxStatesPage;

    before(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.scrollDown(0, 1000);
    })

    it('WLC-TC-1051 [LoggedOut][Login] Sales & Tax Exepmtions Feature - Verify button in footer & WLC-TC-1055 [Redirection to Salex Tax page by URL]', () => {

        cy.step('LoggedOut - Salex Tax & Excemptions content')
        cy.verifyFooter(selectors.footer);
        cy.verifyAndClickLink("Sales Tax & Exemptions") //clicked on from footer
        salestaxpage.verifySalesTaxExemptionContent();
        salestaxpage.verifyStateNamesDisplayed();
        salestaxpage. verifyHoverOverState();
        salestaxpage.clickOnAnyState('Arizona');
        salestaxpage.verifyArizonaPopupContent();
        cy.clickonCloseBtninPopUp();

        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.step('LoggedIn - Salex Tax & Excemptions content')
        cy.verifyFooter(selectors.footer);
        cy.verifyAndClickLink("Sales Tax & Exemptions") //clicked on from footer
        salestaxpage.verifySalesTaxExemptionContent();
        salestaxpage.verifyStateNamesDisplayed();
        salestaxpage. verifyHoverOverState();
        salestaxpage.clickOnAnyState('Arizona');
        salestaxpage.verifyArizonaPopupContent();
        cy.clickonCloseBtninPopUp();

        cy.step('Redirection to Salex Tax page by URL')
        cy.visit('/tax-form');
        salestaxpage.verifySalesTaxExemptionContent();
    })

})