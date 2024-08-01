import selectors from "../support/selectors";

class LaminateFinderPage {
  verifyNavigateToLaminateFinderPage() {
    cy.verifyNavigation("/laminate-finder");
  }

  clickCountryIndicator() {
    cy.get(selectors.imgEditCountryIndicator).click();
  }

  verifyCountryIndicatorText(county, statecode, countryName) {
    let expectedText = `${county},   ${statecode},  ${countryName}`;

    cy.get(selectors.lblCountryEditor).should((label) => {
      expect(label).to.be.visible;
    });
    //trim last whitespace on text
    cy.get(selectors.lblCountryEditor)
      .invoke("text")
      .then((text) => text.trim())
      .should("equal", expectedText);
  }

  verifyLaminateListLoaded() {
    cy.get(selectors.listLaminates).should("be.visible");
    //wait till all items load
    cy.get(selectors.divLaminateTiles).should((items) => {
      expect(items).to.be.visible;
    });
  }

  clickLaminateTile() {
    cy.get(selectors.divLaminateTiles).eq(0).click();
  }

  verifyPriceAvailabilityPopupDisplayed() {
    cy.get(selectors.divPriceAvailabilty).should("be.visible");
  }

  verifyPriceAvailabilityPopup() {
    cy.get(selectors.imgBrandLogo).should("be.visible");
    cy.get(selectors.lblColorCodeName).should("be.visible");
    cy.get(selectors.ddGrade).should("be.visible");
    //cy.get(selectors.ddGrade).eq(1).should('be.visible')
  }

  // clickGradeDropDown(){
  //     cy.get(selectors.ddGrade).eq(0).click()
  // }

  selectGrade(grade) {
    cy.get(".select-box").eq(0).find(selectors.ddGrade).select(grade);
  }

  // clickFinishDropDown(){
  //     cy.get(selectors.ddGrade).eq(1).click()
  // }

  selectFinish(finish) {
    cy.get(".select-box").eq(2).find(selectors.ddGrade).select(finish);
  }

  typeQuantityForSize(qty) {
    cy.get(".table")
      .eq(0)
      .should((field) => {
        expect(field).to.be.visible;
      });
    cy.get(selectors.txtSizeQuantity).eq(0).type(qty);
  }

  verifyShippingOptionAvailable() {
    cy.contains(".shipping-stock-avail", "SHIPPING OPTION").should((link) => {
      expect(link).to.be.visible;
    });
  }

  clickShippingOption() {
    cy.contains(".shipping-stock-avail", "SHIPPING OPTION").click();
  }

  verifyAddToCartButtonAvailable() {
    cy.contains(selectors.btnAddToCartSize, "Add to cart").should((btn) => {
      expect(btn).to.be.visible;
      expect(btn).to.be.enabled;
    });
  }

  clickAddToCartBtn() {
   // cy.contains(selectors.btnAddToCartSize, "Add to cart").click();
    const click = ($el) => $el.click();
    cy.waitForStableDOM();
    cy.contains(selectors.btnAddToCartSize, "Add to cart")
      .pipe(click)
      .should(($el) => {
        expect($el).to.not.be.visible;
      });
  }

  verifyItemPriceIsUpdated() {
    cy.get(selectors.lblAmountSize)
      .eq(0)
      .then(($ele) => {
        let getValue = parseFloat($ele.text());
        //getValue > 0
        cy.wrap(getValue).should("be.gt", 0);
      });
  }

  verifyTotalPriceIsUpdated() {
    cy.get(selectors.lblTotalPriceSize)
      .eq(0)
      .then(($ele) => {
        let getValue = parseFloat($ele.text());
        //getValue > 0
        cy.wrap(getValue).should("be.gt", 0);
      });
  }

  verifyShippingOptionDropDownDisplayed() {
    cy.get(selectors.ddShippingOptionSize).should("be.visible");
  }

  selectShippingOption(option) {
    cy.selectOptionContaining(selectors.ddShippingOptionSize, option);

    // cy.get(selectors.ddShippingOptionSize)
    //   .then((value) => {
    //     expect(value).to.equal(option)
    //    })
  }

  getStockAvailabilityStatus() {
    //in stock display label checck
    // cy.get('[for^="availableAll"]').should((option)=>{
    //     expect(option).to.be.visible
    // })
    cy.get(".shipping-option-wrapper .custom-control-label span")
      .scrollIntoView()
      .should("be.visible")
      .invoke("text")
      .as("stockStatus")
      .then((status) => {
        cy.log("Stock Availability Status:", status);
        if (status == "In Stock") {
          cy.step(
            "If its In Stock, Same Day Shipping option should be available for eligible users (Brea, CA users) by default"
          );
          cy.get(selectors.ddShippingOptionSize).should(
            "include.text",
            "Same Day Shipping"
          );
        }
      });
  }

  checkWillCallAnyWhere() {
    cy.wait(4000);
    cy.get(selectors.chkWillCallAnywhereSize).check({ force: true });
  }

  selectWillCallLocation(location) {
    cy.get(selectors.ddWillCallLocationSize).select(location);
  }

  uncheckSelectedBranch() {
    cy.get("[id^='selectWillCall'] + label").click();
  }

  verifyLoginToBuyInPopup() {
    cy.contains("a", "Login to view price and buy", {
      matchCase: false,
    }).should("be.visible");
  }

  verifyColorZoomInPopup() {
    cy.get(selectors.imgColor).should("be.visible").click();
    cy.xpath(selectors.btnCloseInColor).click();
  }

  closePriceAvailabilityPopup() {
    cy.get(".modal-header .close").click();
  }

  selectItemsPerPage(perPageCount) {
    cy.get(selectors.ddPerPage).eq(0).select(perPageCount);
  }

  verifyItemsPerPage(itemcount) {
    // list is reloading, it will take a while
    cy.get(selectors.divLaminateTiles).should((items) => {
      // will retry until these pass or until timeout
      expect(items).to.have.length(itemcount);
    });
  }

  clickPageNoOnPagination(pageNo) {
    cy.get(selectors.listPagination)
      .eq(0)
      .within(() => {
        cy.contains("li a", pageNo).click();
      });
  }

  verifyPageNoSelected(pageNo) {
    cy.get(selectors.divPageCount)
      .eq(0)
      .invoke("text")
      .then((text) => text.split("-")[0]) // 1st part of split
      .then(parseInt)
      .should("eq", pageNo);
  }

  clickOnBackArrowPagination() {
    cy.get(selectors.listPagination)
      .eq(0)
      .within(() => {
        cy.get('[aria-label="Go to previous page"]').eq(0).click();
      });
  }

  clickOnNextArrowPagination() {
    cy.get(selectors.listPagination)
      .eq(0)
      .within(() => {
        cy.get('[aria-label="Go to next page"]').eq(0).click();
      });
  }

  searchLaminates(searchtxt) {
    cy.get(selectors.txtLaminateSearch).clear().type(searchtxt);
    cy.get(selectors.imgLaminateSearch).click();
    cy.waitForStableDOM()
  }

  verifySearchByColorName(color) {
    //cy.get(selectors.divLaminateTiles)
    //.find('img[alt]')
    cy.get(selectors.imgLaminateTiles).each(($el, index) => {
      //expect($el).to.have.attr('alt').match(/Black/);
      cy.get($el).should("have.attr", "alt").and("contain", color);
    });
  }

  verifySearchByColorCode(colorcode) {
    cy.waitForStableDOM()
    cy.get(selectors.imgLaminateTiles).each(($el, index) => {
      cy.get($el).should("have.attr", "alt").and("contain", colorcode);
      // cy.get($el).should((ele)=>{
      //   expect(ele).to.have.attr("alt",colorcode)
      // })
    });
  }

  verifySearchByColorCodeAndName(color, colorcode) {
    cy.get(selectors.imgLaminateTiles).each(($el, index) => {
      cy.get($el)
        .should("have.attr", "alt")
        .and("contain", color)
        .and("contain", colorcode);
    });
  }

  verifyNoResultsFoundMsg() {
    cy.contains("h3", "No matching result found. Please reset filters.").should(
      "be.visible"
    );
  }

  clickResetAllLink() {
    cy.contains("Reset all").click();
  }

  clickColorOnColorPicker() {
    cy.get(selectors.divColorPickerColor).eq(0).click();
  }

  verifyResetSuccessfully() {
    //color picker is reset
    cy.get(selectors.imgFilteredColor).should("not.exist");
  }

  // verifyAttributeFilters(attribute,index){
  //     cy.get('.filter-heading h5').as('filterLabel')
  //     cy.get('@filterLabel').eq(index).should('have.text',attribute)
  // }

  // verifyBrandFilter(){
  //     cy.get(selectors.imgShowHide).eq(1).click()
  //     cy.get(selectors.listBrands).should('be.visible')

  // }

  clickAttributeFilter(attribute, index) {
    cy.get(selectors.imgShowHide).eq(index).click();
    cy.contains(".filter-block", attribute)
      .should("be.visible")
      .within(() => {
        cy.get(".side-filter-list").should("be.visible");
      });
  }

  collapseColorPicker(index) {
    cy.get(selectors.imgShowHide).eq(index).click();
    cy.get(".color-pallet-wrapper.collapse.show").should("not.exist");
  }

  checkFilterUnderAttributeFIlter(attribute, index, item) {
    cy.contains(".filter-block", attribute).scrollIntoView();
    cy.get(selectors.imgShowHide).eq(index).click().wait(1000);
    cy.contains(".filter-block", attribute).within(() => {
      //wait till items load
      cy.get(".side-filter-list").should((items) => {
        expect(items).to.be.visible;
      });
      //cy.get('.side-filter-list .checkmark').eq(0).click().wait(5000)
      cy.contains(".description", item).click().wait(1000);
    });
  }

  selectAllRegions() {
    cy.get(selectors.chkAllRegions).check().should("have.checked");
  }

  verifyNotAvailbleInTerriorityMsg() {
    cy.get(selectors.divTileMsg).each(($el, index) => {
      cy.get($el).should("be.visible").and("contain", "NOT AVAILABLE IN");
    });
  }

  verifyNotAvailbleInTerriorityMsgNotDisplayed() {
    cy.get(".laminate-finder-item").each(($el, index) => {
      cy.get($el).find(selectors.divTileMsg).should("not.exist");
    });
  }

  verifyLoginToViewPriceButton() {
    cy.contains("Login to view price and buy", { matchCase: false })
      .eq(0)
      .should("be.visible");
  }

  clickLoginToViewPriceButton() {
    cy.contains("Login to view price and buy", { matchCase: false })
      .eq(0)
      .click();
  }

  //EdgeBands

  verifyMatchingEdgebandingAvailable() {
    //cy.scrollTo('bottom')
    cy.get(selectors.divEdgeBandingView).scrollIntoView().should("be.visible");
    cy.contains("Matching Edgebanding").should("be.visible");
  }

  clickMatchingEdgeBand() {
    cy.get(selectors.divEdgeBands).eq(0).click();
  }

  verifyMatchingEdgeBandView() {
    //check edgeband view is open
    cy.get(selectors.lblEdgeBandTitleOpen).should((label) => {
      expect(label).to.be.visible;
    });

    cy.get(selectors.imgEdgeBand).eq(0).scrollIntoView().should("be.visible");
    cy.get(selectors.imgBrandLogoEdge).should("be.visible");
    cy.contains("Brand:").should("be.visible");
    cy.contains("Product Type:").should("be.visible");
    cy.contains("Thickness:").should("be.visible");
  }

  verifyMatchingEdgeBandItemPriceQty() {
    //this method for login state
    cy.get(".table-matching-edgebanding-list")
      .eq(0)
      .within(() => {
        cy.contains("Item #/MFR Part").should("be.visible");
        cy.contains("Width × Roll Size").should("be.visible");
        cy.contains("Price").should("be.visible");
        cy.contains("Qty").should("be.visible");
        cy.contains("Shipping options/ Stock availability").should(
          "be.visible"
        );
      });
  }

  verifyLoginToViewPriceButtonEdge() {
    cy.contains("Log in to view price and buy", { matchCase: false })
      .eq(0)
      .should("be.visible");
  }

  clickLoginToViewPriceButtonEdge() {
    cy.contains("Login to view price and buy", { matchCase: false })
      .eq(0)
      .click();
  }

  clickPriceBreakDownEdge() {
    cy.get(selectors.linkPriceBreakDownEdge).eq(0).click();
  }

  verifyPriceBreakDownEdge() {
    cy.contains("Quantity").should("be.visible");
    cy.contains("UOM").should("be.visible");
    cy.contains("Price").should("be.visible");
  }

  verifyAddTocartDisableEdge() {
    cy.get('[title="Add to cart"]').eq(0).should("be.disabled");
  }

  verifyStockAvailabilityDisableEdge() {
    cy.contains("span", "Shipping/ Stock Avail")
      .eq(0)
      .parent()
      .should("have.attr", "disabled");
  }

  typeQuantityEdge(qty) {
    cy.get('[placeholder="Qty"]').eq(0).type(qty);
  }

  clickStockAvailabilityEdge() {
    cy.contains("span", "Shipping/ Stock Avail")
      .eq(0)
      .parent()
      .as("stockLink")
      .should((link) => {
        expect(link).to.be.not.disabled;
      });
    cy.get("@stockLink").scrollIntoView();
    cy.wait(5000);
    cy.get("@stockLink").click();
    //cy.contains('span', 'Shipping/ Stock Avail').eq(0).click()

    // cy.contains('span', 'Shipping/ Stock Avail').eq(0).parent().within(()=>{
    //     cy.get('picture').click({force:true})
    // })
  }

  //after user click stock aval link
  verifyStockLocationSameDayShipping() {
    //to ue this method user should click change shipping options link first
    cy.get(".shipping-option-wrapper .custom-control-label span")
      .scrollIntoView()
      .should("be.visible")
      .invoke("text")
      .then((status) => {
        let stockStatus = status.trim();
        cy.log("Stock Availability Status:", stockStatus);
        if (stockStatus == "In Stock") {
          cy.get(".method-option span")
            .eq(0)
            .invoke("text")
            .then((shiplocation) => {
              let shipsFromLocationOfItem = shiplocation.trim();
              cy.log("ships From Location Of Item:", shipsFromLocationOfItem);
              if (shipsFromLocationOfItem == "Brea, CA") {
                cy.step(
                  "If its In Stock, Same Day Shipping option should be available for eligible users (Brea, CA users) by default"
                );
                cy.get(selectors.ddShippingOptionSize).should(
                  "include.text",
                  "Same Day Shipping"
                );
              }
            });
        } else if (stockStatus == "Backorder Everything") {
          cy.step(
            'If its Backordered same day delivery option should not be available for "Backorder Everything" option'
          );
          cy.get(selectors.ddShippingOptionSize).should(
            "not.include.text",
            "Same Day Shipping"
          );
        }
      });
  }

  //use pipe logic
  clickAddToCartEdge() {
    cy.scrollTo("bottom");
    const click = ($el) => $el.click();
    cy.waitForStableDOM();
    cy.get('.total-add-cart-btn-row [title="Add to cart"]')
      .eq(0)
      .should("not.have.attr", "disabled");
    //cy.get('.total-add-cart-btn-row [title="Add to cart"]').eq(0).dblclick()
    cy.get('.total-add-cart-btn-row [title="Add to cart"]')
      .eq(0)
      .pipe(click)
      .should(($el) => {
        expect($el).to.not.be.visible;
      });
  }
}

export default LaminateFinderPage;
