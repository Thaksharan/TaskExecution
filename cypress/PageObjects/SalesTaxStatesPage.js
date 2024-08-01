///<reference types="Cypress"/>
import selectors from "../support/selectors.js";

class SalesTaxStatesPage {
  verifySalesTaxExemptionContent() {
    cy.verifyLabel("h1", "Sales Tax (Exemption Certificates)");
    cy.verifyLabel("p", "Sales taxes are charged in the following states:");
    cy.verifyLabel(
      "p",
      "You can download the PDF form by clicking on your state or selecting it from the dropdown"
    );
    cy.verifyDefaultDropdownValue(selectors.salestaxdropdown, "Select a State");
    cy.get(selectors.salesMap).should("be.visible");
    cy.verifyLabel(
      "h5",
      "If your state is not displayed, please call (800) 444-0043 Option 2 for more information"
    );
  }

  verifyStateNamesDisplayed() {
    cy.verifyDefaultDropdownValue(selectors.salestaxdropdown, "Select a State");
    cy.get(selectors.salesMap).should("be.visible");
    cy.verifyLabel(
      "h5",
      "If your state is not displayed, please call (800) 444-0043 Option 2 for more information"
    );
  }

  verifyStateNamesDisplayed() {
    //const stateSelector = '#product-cat > div.content-page-wrapper > div > div:nth-child(4) > svg > g > g:nth-child';
    const expectedStateNames = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Colorado",
      "Florida",
      "Georgia",
      "Indiana",
      "Kansas",
      "Maine",
      "Massachusetts",
      "Minnesota",
      "New Jersey",
      "North Carolina",
      "North Dakota",
      "Oklahoma",
      "Pennsylvania",
      "South Dakota",
      "Texas",
      "Wyoming",
      "Connecticut",
      "Missouri",
      "West Virginia",
      "Illinois",
      "New Mexico",
      "Arkansas",
      "California",
      "Delaware",
      "District of Columbia",
      "Hawai",
      "Iowa",
      "Kentucky",
      "Maryland",
      "Michigan",
      "Mississippi",
      "Montana",
      "New Hampshire",
      "New York",
      "Ohio",
      "Oregon",
      "Tennessee",
      "Utah",
      "Virginia",
      "Washington",
      "Wisconsin",
      "Nebraska",
      "South Carolina",
      "Idaho",
      "Nevada",
      "Vermont",
      "Louisiana",
      "Rhode Island",
    ];
    expectedStateNames.forEach((stateName) => {
      cy.contains("g text", stateName).should("be.visible");
    });
  }

  verifyHoverOverState1() {
    //const stateSelector = `#product-cat > div.content-page-wrapper > div > div:nth-child(4) > svg > g > path:nth-child(${i})`;

    cy.get(selectors.salesMap).each(($element) => {
      if ($element.css("fill") === "rgb(208, 208, 208)") {
        cy.wrap($element)
          .trigger("mouseover", { force: true })
          .should("have.css", "fill", "rgb(208, 208, 208)")
          .trigger("mouseout", { force: true })
          .should("have.css", "fill", "rgb(208, 208, 208)");
      } else {
        cy.wrap($element)
          .trigger("mouseover", { force: true })
          .should("have.css", "fill", "rgb(139, 210, 255)")
          .trigger("mouseout", { force: true })
          .should("have.css", "fill", "rgb(201, 229, 246)");
      }
    });
  }

  verifyHoverOverState() {
    //const stateSelector = `#product-cat > div.content-page-wrapper > div > div:nth-child(4) > svg > g > path:nth-child(${i})`;

    cy.get(selectors.salesMap).each(($element) => {
      if ($element.css("fill") === "rgb(208, 208, 208)") {
        cy.wrap($element)
          .trigger("mouseover", { force: true })
          .should("have.css", "fill", "rgb(208, 208, 208)")
          .trigger("mouseout", { force: true })
          .should("have.css", "fill", "rgb(208, 208, 208)");
      } else {
        cy.wrap($element)
          .trigger("mouseover", { force: true })
          .should("have.css", "fill", "rgb(139, 210, 255)")
          .trigger("mouseout", { force: true })
          .should("have.css", "fill", "rgb(201, 229, 246)");
      }
    });
  }

  verifyArizonaPopupContent() {
    cy.contains(".modal-header", "Download PDFs");
    cy.contains(selectors.closeBtn, "×");
    cy.contains(selectors.option1, "Arizona - Resale Certificate");
    cy.contains(selectors.option2, "Arizona - Tax Exempt Form");
  }

  clickOnAnyState(stateName) {
    cy.log(`Clicking on state: ${stateName}`);
    // Use the contains selector to find the state by text
    cy.get(".rsm-marker text").contains(stateName).click();
  }
}

export default SalesTaxStatesPage;
