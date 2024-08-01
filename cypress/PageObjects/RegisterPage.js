import selectors from '../support/selectors.js';

class RegisterPage{

    verifyRegisterForm(){
        cy.get(selectors.formRegister).should('be.visible').within(() => {
            cy.get(selectors.txtFldAccountNum).should('be.visible').type('999999')
            cy.get(selectors.ddSetRole).should('be.visible').select('Accounting Manager')
            cy.get(selectors.txtFldFname).should('be.visible').type('Test')
            cy.get(selectors.txtFldLname).should('be.visible').type('User')
            cy.get(selectors.txtfldEmail).should('be.visible').type('test@villvay.com')
            cy.get(selectors.txtfldPhone).should('be.visible').type('0772433556')
            //cy.get(selectors.chkReCapture).should('be.visible')

            //cannot test capture click
            cy.frameLoaded('iframe[title="reCAPTCHA"]')
            cy.get('iframe[title="reCAPTCHA"]')
              .first()
              .then((recaptchaIframe) => {
               const body = recaptchaIframe.contents()
               cy.wrap(body).find('.recaptcha-checkbox-border')
                 .should('be.visible')
                 //.click()
            })

            //without capture cannot submit form
            cy.get(selectors.btnRegister).should('be.visible')
             // .click()
        })
    }
 
}

export default RegisterPage;