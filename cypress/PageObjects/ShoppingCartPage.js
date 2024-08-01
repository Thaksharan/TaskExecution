import selectors from "../support/selectors.js";

class ShoppingCartPage {
  verifyNavigateToShoppingCartPage() {
    cy.verifyNavigation("/shopping-cart");
  }

  verifyShoppingCartPageHeader() {
    cy.verifyLink("Shopping Cart");
  }

  verifyShoppingCartTableIsLoaded() {
    cy.get(".cart-table-wrapper table tbody").should((tabledata) => {
      expect(tabledata).to.be.visible;
    });
    cy.waitForStableDOM();
  }
  //to do-implement this methos in other scripts also
  //this method verify item by partial text of item name
  verifyItemIncart(itemname) {
    cy.contains(".prod-des-details h4", itemname, { matchCase: false });
  }

  verifyItemDeleted(itemname) {
    cy.contains(".prod-des-details h4", itemname, { matchCase: false }).should(
      (lbl) => {
        expect(lbl).to.not.exist;
      }
    );
  }

  verifyItemInCartByItemID(itemId) {
    cy.contains(".item__link a", itemId, { matchCase: false });
  }

  clickOnDeleteItem(itemcode) {
    cy.xpath(
      `//tr[td[contains(.,"${itemcode}")]]/td/a[@title="Delete item"]`
    ).click();
  }

  // verifyShoppingCartlabel(){
  //     cy.verifyLabel("h2","Shopping Cart");
  // }

  clearAllItemsOnCart() {
    //cy.wait(5000)
    this.verifyNavigateToShoppingCartPage();

    cy.get(".spinner").should((wrapper) => {
      expect(wrapper).to.not.exist;
    });

    cy.contains("Please wait").should((wrapper) => {
      expect(wrapper).to.not.exist;
    });

    cy.waitForStableDOM();

    // page is loaded, continue with the test
    cy.get(".cart-table-wrapper")
      .scrollIntoView()
      .then(($el) => {
        // page loading, wait for loader to disappear
        cy.get(".spinner", { timeout: 20000 }).should("not.exist");
        if ($el.find(selectors.btnClearCart).length) {
          // Element exists, do something
          cy.get(selectors.btnClearCart, { timeout: 15000 }).click();
          //check delete popup open
          cy.get(".modal-content").should((popup) => {
            expect(popup).to.be.visible;
          });

          cy.get(".modal-content").within(() => {
            cy.get('[title="CONFIRM"]').click();
          });
          cy.wait(2000);
          //sometimes relading does not happen after click confrim hence add
          cy.reload();

          //check cart api to all items are deleted
          // cy.intercept({
          //     method: 'GET',
          //     url: '/api/pim/webservice/ecommerce/cart'
          // }).as('loadCartProducts')

          // cy.wait('@loadCartProducts').then( (cart) => {
          //     expect(cart.response.statusCode).to.eq(200)
          //     //expect(cart.response.body.total-quantity).to.eq(0)
          //     expect(cart.response.body).property('total-quantity').to.eq(0)
          //   })

          //cy.clickOnButton('CONFIRM');
          //cy.wait(2000)

          cy.contains("The Cart is Empty", { matchCase: false }).should(
            (label) => {
              expect(label).to.be.visible;
            }
          );
          cy.log("All items in cart cleared");
        } else {
          // Element does not exist, do something else
          cy.contains("The Cart is Empty", { matchCase: false }).should(
            (label) => {
              expect(label).to.be.visible;
            }
          );
          cy.log("No items in cart page");
        }
      });
  }

  clearAppliedPromoCode() {
    cy.get(".side-bar-box").then(($el) => {
      if ($el.find(selectors.btnClosePromoCode).length) {
        this.closeAppliedPromoCode();
      } else {
        cy.log("No already applied promocodes in cart page");
      }
    });
  }

  closeAppliedPromoCode() {
    cy.get(selectors.btnClosePromoCode).should((ele) => {
      expect(ele).to.be.exist;
    });
    cy.get(selectors.btnClosePromoCode).click({ force: true });
  }

  //wait until field loaded
  verifySubTotalFieldLoaded() {
    cy.get(selectors.lblSubtotal).should((item) => {
      expect(item).to.be.visible;
    });
  }

  verifySubTotalWhenQuantityChange(unitPrice, itemCount) {
    this.verifySubTotalFieldLoaded();
    //cy.get('.sub-total-field > span > span').invoke('text').as('textValue')
    let expectedPrice = Number(unitPrice) * Number(itemCount);
    let expectedPriceRounded = expectedPrice.toFixed(2);
    cy.get(selectors.lblSubtotal).should("have.text", expectedPriceRounded);
  }

  verifySubTotalWhenQuantityChange2() {
    let unitPrice, itemCount;
    cy.get(".unit-price span")
      .as("priceLabel")
      .should((price) => {
        expect(price).to.be.visible;
      });

    cy.get("@priceLabel")
      .eq(0)
      .invoke("text")
      .then((txt) => {
        unitPrice = Number(txt);
        //cy.wrap(unitPrice).as('unitPriceOfItem')
        cy.log("unit Price: " + unitPrice);
      });

    cy.get(selectors.Qty).should((field) => {
      expect(field).to.be.visible;
    });

    this.verifySubTotalFieldLoaded();

    cy.get(selectors.Qty)
      .invoke("val")
      .then((txt) => {
        itemCount = Number(txt);
        cy.log("quantity in cart:" + itemCount);
        let expectedPrice = unitPrice * itemCount;
        let expectedPriceRounded = expectedPrice.toFixed(2);

        // Format with US locale (comma as separator, dot as decimal)
        let formattedPrice = parseFloat(expectedPriceRounded).toLocaleString("en-US");

        cy.log("formmatted price:: " + formattedPrice)

        cy.get(selectors.lblSubtotal).should("have.text", formattedPrice);
      });
  }

  getUnitPrice() {
    let unitPrice;
    cy.get(".unit-price span")
      .as("priceLabel")
      .should((price) => {
        expect(price).to.be.visible;
      });

    cy.get("@priceLabel")
      .eq(0)
      .invoke("text")
      .then((txt) => {
        unitPrice = Number(txt);
        cy.wrap(unitPrice).as("unitPriceOfItem");
        cy.log("unit Price: " + unitPrice);
      });
  }

  getTotalOfCart() {
    cy.xpath(selectors.lblTotalValue).then(($value) => {
      let getText = $value.text();
      return getText;
    });
  }

  redeemPromoCode(promocode) {
    // cy.get(selectors.lblTotalValue).invoke('text').as('totalBeforePromo');
    // //cy.log(totalBeforePromo)
    // cy.enterValue(selectors.promocode,'LP1025')
    // cy.clickOnButton('Redeem')
    // cy.verifyLabel('span','Applied')
    // //cy.get(selectors.lblTotalValue).invoke('text').as('totalBeforePromo');
    // cy.get(selectors.lblTotalValue).should('be.lessThan', Number(totalBeforePromo))

    cy.xpath(selectors.lblTotalValue).then(($value) => {
      const totalBeforePromo = parseFloat($value.text());
      //cy.wrap(totalBeforePromo)
      cy.enterValue(selectors.promocode, promocode);
      cy.clickOnButton("Redeem");

      cy.contains("span", "Applied").should((ele) => {
        expect(ele).to.be.visible;
      });
      //cy.verifyLabel('span','Applied')
      cy.xpath(selectors.lblTotalValue).then(($valueAfter) => {
        const totalAfterPromo = parseFloat($valueAfter.text());
        cy.wrap(totalAfterPromo).should("be.lt", totalBeforePromo);
      });
    });
  }

  typeQuantityOfItem(quantity) {
    cy.get(selectors.Qty).should((field) => {
      expect(field).to.be.visible;
    });

    cy.typeValue(selectors.Qty, quantity);
  }

  //get min qty user added then update new qty
  updateQuantityToMultipleOfMinQty(multiple) {
    let minQty, multipleQty;
    cy.get(selectors.Qty).should((field) => {
      expect(field).to.be.visible;
    });

    cy.get(selectors.Qty)
      .invoke("val")
      .then((txt) => {
        minQty = Number(txt);
        cy.log("quantity in cart:" + minQty);
        multipleQty = minQty * multiple;
        cy.log("new quantity in cart:" + multipleQty);

        cy.typeValue(selectors.Qty, multipleQty);
      });
  }

  updateMultipleOfMinQtyAndVerifyTT(multiple) {
    let minQty, multipleQty;
    cy.get(selectors.Qty).should((field) => {
      expect(field).to.be.visible;
    });

    cy.get(selectors.Qty)
      .invoke("val")
      .then((txt) => {
        minQty = Number(txt);
        cy.log("quantity in cart:" + minQty);
        multipleQty = minQty * multiple;
        cy.log("new quantity in cart:" + multipleQty);

        cy.typeValue(selectors.Qty, multipleQty);
      });
  }

  typeQuantityOfItemByItemID(itemId, quantity) {
    cy.xpath(`//tr[td[contains(.,"${itemId}")]]/td//input[@id="Qty1"]`)
      .as("qty")
      .should((field) => {
        expect(field).to.be.visible;
      });

    cy.typeValueXpath(
      `//tr[td[contains(.,"${itemId}")]]/td//input[@id="Qty1"]`,
      quantity
    );
    //cy.xpath('@qty').clear().type(quantity).type('{enter}')
  }

  //to do-check whr this method can be used
  verifyQuantityOfItem(quantity) {
    cy.get(selectors.Qty).should((field) => {
      expect(field).to.be.visible;
    });

    // cy.verifyTextBoxValue(selectors.Qty,quantity)
    cy.get(selectors.Qty).should("have.value", quantity);
  }

  typePONumber(poNo) {
    cy.enterValue(selectors.poNo, poNo);
  }

  typeJobName(jobName) {
    cy.enterValue(selectors.jobName, jobName);
  }

  clickChangeShippingOptions(itemcode) {
    cy.xpath(
      `//tr[td[contains(.,"${itemcode}")]]/following::tr[1]//span[@title="Change shipping option"]`
    )
      .should("be.visible")
      .click();
  }

  clickChangeShippingOptionsWithoutID() {
    cy.get('[title="Change shipping option"]')
      .eq(0)
      .should("be.visible")
      .click();
  }

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

  getShippingMethodOfItem() {
    let shippingMethod;
    cy.get(".ship-details")
      .eq(0)
      .invoke("text")
      .then((text) => {
        shippingMethod = text.split("|")[2];
        // let shiplocation=firstpart.split('from ')[1]
        cy.log(shippingMethod);
      });
    return shippingMethod;
  }

  getShipsFromLocationOfItem() {
    // cy.get('.ship-details').eq(0).invoke('text')
    //   .then(text => text.split('|')[0])   // 1st part of split
    //   .then(parseInt)
    //   .should('eq', pageNo)

    cy.get(".ship-details")
      .eq(0)
      .invoke("text")
      .then((text) => {
        let firstpart = text.split("|")[0];
        let shiplocation = firstpart.split("from ")[1];
        cy.log(shiplocation);
      });
  }

  selectChangeShippingMethodTop(shippingMethod) {
    cy.get('[for="changeShippingMethod"] + select').select(shippingMethod);
  }

  clickUseLargeOrderButton() {
    cy.clickOnButton("USE LARGE ORDER PAD");
  }

  typeItemSKULargeOrderPad(index, value) {
    cy.enterValue(`//tbody/tr[${index}]/td[2]/div[1]/input[1]`, value);
  }

  verifyItemSKULargeOrderPad(index, value) {
    cy.xpath(`//tbody/tr[${index}]/td[2]/div[1]/input[1]`).should(
      "have.value",
      value
    );
  }

  typeItemAliasLargeOrderPad(index, value) {
    //cy.enterValue(`//tbody/tr[${index}]/td[2]/div[1]/input[1]`, value);
    cy.xpath(`//tbody/tr[${index}]/td[2]/div[1]/input[1]`).type(value);
  }

  clickSKUfromSuggestionListLargeOrderPad(sku) {
    //cy.waitForStableDOM();
    //verify only 1 suggestion displayed
    //cy.get('a[data-tip="true"]').should('have.length','1')
    //verify correct suggestion displayed

    // cy.get(`.media [id="${sku}"]`).should('be.visible').click()

    //previous
    cy.get(`[data-for='${sku}']`).as("suggestion").should("be.visible");
    cy.get("@suggestion").click();
    //.trigger('mouseover')

    /*const click = ($el) => $el.click();
    cy.waitForStableDOM();
    //cy.wait(5000)
    cy.get(`[data-for='${sku}']`) 
      .pipe(click)
      .should(($el) => {
        expect($el).not.to.be.visible;
      });*/
  }

  typeItemQuantityLargeOrderPad(index, value) {
    cy.enterValue(`//tbody/tr[${index}]/td[4]/input[1]`, value);
  }

  verifyItemQuantityLargeOrderPad(index, expectedvalue) {
    cy.verifySelectedValueByXpath(
      `//tbody/tr[${index}]/td[4]/input[1]`,
      expectedvalue
    );
  }

  verifyDiscountPriceDisplayInCart() {
    cy.get(".discount-price").then(() => {
      cy.get(".old-price").should("be.visible");
      cy.get(".save-price").should("be.visible");
    });
  }

  verifyInvalidFileUploadError() {
    cy.contains("NOTE: Make sure to use the given template.").should(
      "be.visible"
    );
    cy.contains(
      "Invalid file format. Only EXCEL and CSV are supported."
    ).should("be.visible");
  }
}

export default ShoppingCartPage;
