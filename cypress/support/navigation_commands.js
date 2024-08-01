/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import selectors from "./selectors";

//header-top navigations=====

//click link Register-go to register page
Cypress.Commands.add('clickRegister',()=>{
  cy.step('Click on Register Link')
  cy.clickonLink('Register');
  cy.verifyLabel('h1', "Register Your User Profile");
})

//click link Quick Order to open quick order popup
Cypress.Commands.add('clickQuickOrder',()=>{
  cy.step('Click on Quick Order Link')
  cy.clickonLink("Quick Order")
})

//click link clickViewAccountHistory
Cypress.Commands.add('clickViewAccountHistory',()=>{
  cy.contains('.nav-item.dropdown','View Account & History').click()
})

//logout from system using view account dropdown
Cypress.Commands.add('logout',()=>{
  cy.step('Click on Logout')
  //cy.selectItem('View Account & History');
  //cy.contains('.nav-item.dropdown','View Account & History').click()
  cy.clickViewAccountHistory()
  //homepage.clickLogout()
  cy.waitForStableDOM()
  cy.get('ul.dropdown-menu.show').should((ele)=>{
    expect(ele).to.be.visible
  }
  )
  cy.get('ul.dropdown-menu.show')
    .find("[title='Logout']").eq(0).as('logout')
  
  cy.get('@logout').click({force:true})
  cy.on('uncaught:exception', (err, runnable) => {
    return false
  })      
})

//Go to my favourite page using view account dropdown
Cypress.Commands.add('navigateToMyFavPage',()=>{
  cy.selectItem('View Account & History');
  cy.verifyLink("My Favorites")
  cy.selectItem('My Favorites');
  cy.verifyLabel("h2","My Favorites");
  cy.wait(5000)
})

//header-middle navigations=====

//click view cart on header bar
Cypress.Commands.add('clickViewCartOnHeader',()=>{
  cy.get(selectors.linkHeaderCart).as('viewCart').should((link)=>{
    expect(link).to.be.visible
  })

  cy.get('@viewCart')
    .click().wait(4000);
})

//category-nav-bar navigations======

//verify href of each tab
Cypress.Commands.add('verifyNavigationTabLinkAttribute',(linkText,linkUrl)=>{
  cy.contains('#main-nav-home',linkText).should('have.attr', 'href', linkUrl)
})

//Go to page by clicking main navigation tabs
Cypress.Commands.add('clickOnMainNavTab', (title) => {
  cy.step('click On Main Navigation Tab: '+title)
  //TODo-when screen size chage main nav show more dropdown, 
  //under that some labels are hidden.
  //modify func to support both
  cy.contains('#main-nav-home',title).should((label)=>{
    expect(label).to.be.visible
  })
  cy.contains('#main-nav-home',title)
  .click().wait(1000)
});

//verify navigation to nav tab page
Cypress.Commands.add('verifyNavigation',(pageUrl)=>{
  cy.location('pathname', {timeout: 30000})
      .should('include', pageUrl);
})

//click toggle navigation category menu
Cypress.Commands.add('clickOnCategoryMenuToggle', (label) => {
  cy.get('#category-menu').scrollIntoView().as('categoryDropdown')
    cy.get('@categoryDropdown').click({
      force: true,
      preventDefault: true
    })
  });

//custom command for select category by value using labels
Cypress.Commands.add('selectCategory', (title) => {
    cy.get(`a[title="${title}"]`).click({ force: true })
  });

//custom command for select category and subcategory by value using labels
Cypress.Commands.add('verifyAndClickShopByCategoriesSubCat', (category,subCategory) => {
  cy.contains('.nav-item a',category)
        //.should('contain',category)
        .invoke('css', 'color', 'red')
        //.invoke('show')
        //cypress issue-mouseover/hover not working properly
        //.trigger('mousemove');
    cy.contains('.navbar-nav.mr-auto.sub-navbar-nav',subCategory)
        .invoke('css', 'display', 'block').wait(1000);
    cy.contains('.sub-navbar-nav a',subCategory)
        //.should('contain',subCategory)
        .should('be.visible').click();
    cy.get('.navbar-nav.mr-auto.sub-navbar-nav')
        .invoke('css', 'display', 'none');
});

//green bar-adreess=====

Cypress.Commands.add('verifyPreferredShipVia', () => {
  cy.get('.deliver-sec').within(()=>{
    cy.get('p')
      .eq(1)
      .should('include.text','Same Day Shipping  (if ordered before 12:00 Noon)')
  })
});

Cypress.Commands.add('verifyMainShipLocation', () => {
  cy.get('.deliver-sec').within(()=>{
    cy.get('p')
      .eq(0)
      .should('include.text','Brea, CA')
  })
});


//cypress commands to verify user successfully logged in and site loaded
Cypress.Commands.add('verifySiteLoaded', () => {
  cy.closeAdvertisementPopup()
  //cy.verifyLink("Quick Order")
  cy.contains("Quick Order").should((label)=>{
    expect(label).to.be.visible
  })
 
  //wait until page load due to shiipping details update
  cy.contains("My Pickup Branch").should((label)=>{
    expect(label).to.be.visible
  })

  cy.get(".user-root div p+h4").should((label)=>{
    expect(label).to.be.visible
  })

  cy.closeAdvertisementPopup()

})
