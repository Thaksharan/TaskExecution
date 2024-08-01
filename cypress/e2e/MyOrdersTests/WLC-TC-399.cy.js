import MyOrdersPage from "../../PageObjects/MyOrdersPage";

describe('My Orders Tests',()=>{
    const myOrders= new MyOrdersPage()

    before(()=>{
        cy.visit('/')
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()
    })

    it('WLC-TC-399 Verify the My Orders Section Functionalities',()=>{
        cy.clickOnMainNavTab('My Orders')
        myOrders.verifyMyOrderPageHeader()
       // cy.wait(8000)

        // cy.step('search valid order number')
        // myOrders.searchbyOrderNumber('200890473')
        // myOrders.verifyOrderNoInTable('200890473')

        // cy.step('search invalid order number')
        // myOrders.searchbyOrderNumber('66666666666')
        // myOrders.verifyNoRecordsLabel()

        // cy.step('Add custom duration and search orders')
        // myOrders.setDuration('Custom')
        // myOrders.clickSearchOrderButton()

        cy.step('add duration from dropdown')
        myOrders.setDuration('90 days')

        cy.step('click on order type Filter and search')
        //to unselect all check boxes first click
        myOrders.clickOrderType('All')
        cy.wait(500)
        myOrders.clickOrderType('Order')
        myOrders.clickSearchOrderButton()
        myOrders.verifyFilterOrderInTable('Order')

        cy.step('click reset button')
        myOrders.clickResetButton()
        myOrders.verifyAfterResetState()


        
    })
})