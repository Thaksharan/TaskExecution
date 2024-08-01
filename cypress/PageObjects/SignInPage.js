import selectors from '../support/selectors.js';

class SignInPage {
    verifyModalDailogBox() {
        cy.get(selectors.dialogSignIn).should('be.visible')
    }

    verifyAndClickStaySignedCheckbox() {
        cy.get(selectors.chkStaySigned).should('be.visible').click();
    }

    verifyValidUsernameTextValue(validusername) {
        cy.get(selectors.txtEmail)
            .should('have.value', validusername)
    }


    verifyValidPasswordTextValue(validpassword) {
        cy.get(selectors.txtPassword)
            .should('have.value',validpassword)
    }

    verifyInvalidUsernameTextValue(invalidusername) {
        cy.get(selectors.txtEmail)
            .should('have.value', invalidusername)
    }


    verifyInvalidPasswordTextValue(invalidpassword) {
        cy.get(selectors.txtPassword)
            .should('have.value', invalidpassword)
    }

    verifyErrorMessage() {
        cy.get(selectors.alertErrorMessage)
            .should('be.visible');
        cy.get(selectors.imgAlertIcon).
            should('be.visible');
        cy.get(selectors.txtAlertTitle)
            .should('have.text', 'Error!');
        cy.get(selectors.txtAlertBody)
            .should('have.text', 'Invalid credentials');
        cy.get(selectors.imgAlertClose).
            should('be.visible').click();
    }

    verifyAndClickPasswordEyeIcon() {
        cy.get(selectors.imgEyeIconPassword).should('be.visible').click();
    }

}

//const signInPage = new SignInPage();
export default SignInPage;