import ProductPage from "../../PageObjects/ProductPage";
import selectors from '../../support/selectors.js';

describe('Product Tests',() =>{
    const productpage=new ProductPage(); 

    beforeEach(()=>{
            cy.visit('/')
            cy.login();
            cy.setAccountShippingAddress()
            cy.verifySiteLoaded()
            
            cy.clickOnMainNavTab('Home')

            
        } ) 
    
        it('WLC-TC-540 [Logged In][Product page top green section] Verify the same day shipping functionality' , () =>{
  
             cy.step('verify Preferred Ship Via - default value should be “Same Day Shipping')
             cy.verifyPreferredShipVia()

             cy.step('verify Main Ship Location should be eligible user area (Brea, CA)')
             cy.verifyMainShipLocation()
  
        }) 
    })