import CategoryPage from "../../PageObjects/CategoryPage";
import selectors from "../../support/selectors";

/**
 * for TC 390 Select a product test data which have more than 1 variation(ex-se901)
 */


describe('Category Tests', () => {
    const categorypage = new CategoryPage();

    //Access data through hooks for multiple it blocks
    let product_test_data
    let category_filter_data
    before(()=>{
      cy.fixture(Cypress.env("fixtureFolder") + '/product_SE901').then((data)=>{
       product_test_data=data
      })

      cy.fixture(Cypress.env("fixtureFolder") + '/category_filters').then((data)=>{
        category_filter_data=data
       })

    })

    beforeEach(() => {
        cy.visit('/')
        cy.closeAdvertisementPopup()
        cy.login();
        cy.setAccountShippingAddress()
        cy.verifySiteLoaded()

    })

    it('WLC-TC-390 Verify Category Page', () => {
        
        cy.step('Click shop by category option')
        cy.clickonLink("Shop By Category");
        categorypage.verifyAllShopByCategories();
        categorypage.verifyCloseShopByCategory();

        cy.step('Go to the category -> subCategory')
        // cy.selectCategory(product_test_data.item_category);
        // cy.clickonLink(product_test_data.item_subCategory);
        cy.verifyAndClickShopByCategoriesSubCat(product_test_data.item_category,product_test_data.item_subCategory);

        cy.step('sub category verifications,Click on sort by')
        cy.verifyLabel('h5', 'Categories')
        cy.verifyLabel('h1', product_test_data.item_subCategory);
        const expectedAccessoriesTexts = [product_test_data.item_category, product_test_data.item_subCategory]
        cy.verifyBreadcrumbText(expectedAccessoriesTexts)
        categorypage.verifyMaxNumOfProductsPerPage(20);
        categorypage.verifyTopPaginationOfProductList();
        categorypage.verifyBottomPaginationOfProductList();
        //cy.scrollDown(0, 250)

        //cy.step('Click on Expand icon of Brand filter on the LHS filter')
        // const expectedList1 = category_filter_data.brands_list_CaulkingSealants
        // cy.verifyUlInsideLi(selectors.elementCatBrandName, selectors.ulCategoriesBrand, expectedList1);

        cy.step('Click on Expand icon of Brand filter and select filter')
        //cy.clickOnCheckBox(selectors.checkBoxBrandFESTOOL)
        categorypage.checkFilterUnderAttributeFIlter('Brands',0,product_test_data.item_brand)

        cy.step('able to see selected choice on top of the product list as active filter')
        categorypage.verifyActiveFilterLabel()

        

        cy.step('verify product type filter and click on filter')
        categorypage.checkFilterUnderAttributeFIlter('Product Type',1,product_test_data.item_product_type)

        cy.step('On each product it shows the image, name, brand, variation and view item button')
        //cy.verifyProductInfo(selectors.imgMA99014Product)
        categorypage.verifyProductImageDisplayed(product_test_data.item_main_name)
        categorypage.verifyProductBrandDisplayed(product_test_data.item_brand)
        //cy.verifyLabel("a", product_test_data.item_brand)
        cy.verifyLabel("a", product_test_data.item_main_name)
        //cy.verifyLabel("div",product_test_data.item_dd_selection)
        categorypage.verifyMakeSelectionDropDownDisplayed(product_test_data.item_main_name)
        categorypage.verifyProductVariationsDisplayed()
        cy.verifyLabel("a", "View item");

        //TO DO-    DROPDOWN VALUE SELECTED, BUT AUTOMATICALLY RESET VALUE
        // cy.step('Select variation from dropdown of product which have more than 1 variation')
        // categorypage.selectVariationFromDropDown(product_test_data.item_main_name,product_test_data.item_id)

        //cy.wait(5000)

        cy.step('click on view item Button')
        categorypage.clickViewItemButton(product_test_data.item_main_name)

       // cy.wait(5000)
       cy.step('go back to category page')
       cy.go('back') // equivalent to clicking back button
        

        

        

        cy.step('click close button on top first filter that shows brand')
        //cy.clickOnButtonsByXpath(selectors.btnActiveFilters);
        categorypage.clickCloseOnActiveFilter()

        cy.step('Click Reset button below to the filter bar')
        //cy.clickOnButtonsByXpath(selectors.btnResetCategory)
        categorypage.clickResetFilters()

        // cy.step('verify product type filter')
        // const expectedList2 = category_filter_data.product_type_list
        // cy.verifyUlInsideLi(selectors.elementCatProductType, selectors.ulCategoriesBrand, expectedList2)
        // cy.step('click on belt canner checkbox on productType category')
        // cy.clickOnCheckBox(selectors.checkBoxProdTypeBeltClnr)

        

        

        cy.step('Click on sort by')
        categorypage.clickAndSelectSortBy()

    })


})