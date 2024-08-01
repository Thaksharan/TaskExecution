//import selectors from '../../support/selectors.js';
import RegisterPage from "../../PageObjects/RegisterPage";


    describe('Review Order Tests',() =>{
    const registerPage=new RegisterPage()

    before(()=>{
        cy.visit('/')
        cy.closeAdvertisementPopup()
    } ) 

    it('WLC-TC-412 Verify the registration process' , () =>{

        cy.clickRegister()
        cy.step('verify Register Form')
        registerPage.verifyRegisterForm()
                
    })



    } )
