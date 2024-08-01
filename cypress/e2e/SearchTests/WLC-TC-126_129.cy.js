import ProductPage from '../../PageObjects/ProductPage.js';

describe('Search Tests', () => {
    const productpage =  new ProductPage();

    //Access data through hooks for multiple it blocks
    let alias_data
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") +'/alias.json').then((data)=>{
        alias_data=data
      })
    })

    beforeEach(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.clickSearchBar();
        cy.verifyCountrySelectorPopup()
        cy.enterCountryInCountrySelectorPopup("US")
        cy.clickContinuInCountrySelectorPopup()

    })

    it('WLC-TC-126_129 [LoggedOut][Login] [Top bar search][Add to cart popup search]- Verify search by alias using Global search(Native search)', () => {

        //previous alias-PSS537-613,product related 1" Chip Brush,selecteddropdown-AB10010,maufac no-WV10
        cy.searchFromSearchBar(alias_data.alias_name); //search for an alias
        productpage.verifyProductName(alias_data.product_of_alias);
        productpage.verifySelectedItemVariationDropdown(alias_data.product_of_alias_variation_id)
        cy.waitForStableDOM()
        productpage.verifyitemManufacturerNo(alias_data.product_of_alias_manufacture_no);
        productpage.verifyLoginToViewPriceBtn();

        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

        cy.step('Search alias in Top Bar Search')
        cy.searchFromSearchBar(alias_data.alias_name); //search for an alias
        productpage.verifyProductName(alias_data.product_of_alias);
        productpage.verifySelectedItemVariationDropdown(alias_data.product_of_alias_variation_id)
        productpage.verifyitemManufacturerNo(alias_data.product_of_alias_manufacture_no);

        cy.step('Search alias in Add to Cart popup Search')
        productpage.verifyAddToCart()
        productpage.verifyQuantityLabel()
        productpage.typeQuantityOfItem('2')
        productpage.clickAddToCart()
        cy.searchFromAddtoCartSearchBar(alias_data.alias_name)
        cy.wait(1000)
        productpage.verifyProductName(alias_data.product_of_alias);
        productpage.verifySelectedItemVariationDropdown(alias_data.product_of_alias_variation_id)
        productpage.verifyitemManufacturerNo(alias_data.product_of_alias_manufacture_no);

    })

})