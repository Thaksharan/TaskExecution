/// <reference types = '@cypress/xpath'/>
/// <reference types="Cypress" />
import ProductPage from "../PageObjects/ProductPage";
import selectors from "./selectors";

Cypress.Commands.add("clickSearchBar", () => {
  cy.get(selectors.searchBar).should('be.not.disabled').click();
});

//custom command to search items from the search bar-navigate to searched product or search results page
Cypress.Commands.add("searchFromSearchBar", (searchText) => {
  cy.step("user search :" + searchText);
  cy.get(selectors.searchBar).clear().type(searchText).type("{enter}");
  cy.wait(2000);
  //cy.xpath("//div[@class='main-search']/form").submit();
});

//custom command to search items from the search bar-navigate in add to cart pop up to searched product or search results page
Cypress.Commands.add("enterTextAddtoCartSearchBar", (searchText) => {
  cy.step('search From Add to Cart SearchBar: '+ "user search :" + searchText)
  cy.get(selectors.addToCartSearchBar).clear().type(searchText);
  cy.wait(1000);
});

//custom command to search items from the search bar-navigate in add to cart pop up to searched product or search results page
Cypress.Commands.add("searchFromAddtoCartSearchBar", (searchText) => {
  cy.step('search From Add to Cart SearchBar: '+ "user search :" + searchText)
  cy.get(selectors.addToCartSearchBar).clear().type(searchText).type("{enter}");
  cy.wait(1000);
});

//Click on one suggestion from search list
//1-enter text in search bar
Cypress.Commands.add("enterTextInSearchBar", (searchText) => {
  cy.enterText(selectors.searchBar, searchText);
  cy.wait(2000)
});

//2-Click on one suggestion from list
Cypress.Commands.add("clickSearchSuggestion", (searchText) => {
  cy.clickElementByText(selectors.searchBarSuggestion, searchText);
});

Cypress.Commands.add("verifyListHeadingsDisplayOnSearchSuggestion", () => {
  cy.get(".suhead").eq(0).should("have.text", "Brands");
  cy.get(".suhead").eq(1).should("have.text", "Categories");
  cy.get(".suhead").eq(2).should("have.text", "Product");
});

Cypress.Commands.add("clickBrandBlock", () => {
  cy.get(".brands-block").eq(0).click();
});

Cypress.Commands.add("clickProductSuggested", (index) => {
  cy.get(".item-dic").eq(index).click();
});

Cypress.Commands.add("verifySearchResultsIsLoaded", (searchText) => {
  cy.get(".product-name").should((items) => {
    expect(items).to.be.visible;
  });
});

Cypress.Commands.add("getSearchResultsCount", () => {
  let count;
  cy.step("Get Search Results Count");
  cy.get(".main-cat-name-header").should((label) => {
    expect(label).to.be.visible;
  });

  cy.get(".main-cat-name-header")
    .invoke("text")
    .then((text) => {
      let count1 = text.split("Product Items (")[1];
      count = count1.split(")")[0];
      cy.log("Product Items Search Reuslts Count:" + count);
    });

  return count;
});

Cypress.Commands.add("getCount", () => {
  return cy.get(".main-cat-name-header").invoke("text");
});

//verify Search Results Has search Key
// Cypress.Commands.add("verifySearchResultsNameHasKey", (searchKeyword) => {
//   cy.step("###verify relevant results in suggetion list###");
//   cy.get(".product-name").each(($ele, index) => {
//     let productNameList=$ele.text().trim().toLowerCase()
//     if (productNameList.includes(searchKeyword.toLowerCase())) {
//       expect(productNameList).to.include(searchKeyword.toLowerCase() ); //Assertion for partial text

//     } else {
//       //first 10 search results does not have searchKeyword
//       cy.log($ele.text() + " does NOT have " + searchKeyword);

//     }

//   });

//   // cy.get(`.product-name:visible:contains(${searchKeyword})`).its('length').then(($count)=>{
//   //   cy.log("Relevant search results fouund out of 10::" + $count )
//   //   //check atleast 1 results found then pass testcase
//   //   cy.wrap($count).should('be.gte',1)
//   // })

//   cy.get(".product-name span").contains(searchKeyword,{matchCase:false}).its('length').then(($count)=>{
//       cy.log("Relevant search results fouund out of 10::" + $count )
//       //check atleast 1 results found then pass testcase
//       cy.wrap($count).should('be.gte',1)
//     })

// });

Cypress.Commands.add("verifySearchResultsNameHasKey", (searchKeyword) => {
  cy.step("###verify relevant results in search results page###");
  let count = 0; // Counter variable

  cy.get(".product-name")
    .each(($ele) => {
      let productNameList = $ele.text().trim().toLowerCase();
      if (productNameList.includes(searchKeyword.toLowerCase())) {
        count++; // Increment the counter when the condition is met
        expect(productNameList).to.include(searchKeyword.toLowerCase());
      } else {
        // First 10 search results do not have searchKeyword
        cy.log($ele.text() + " does NOT have " + searchKeyword);
      }
    })
    .then(() => {
      cy.log(`Number of elements with ${searchKeyword}: ${count}`);
      //check atleast 1 results found then pass testcase
      cy.wrap(count).should("be.gte", 1);
    });
});

Cypress.Commands.add("verifySearchResultsSuggestionListHasKey", (searchKeyword) => {
  cy.step("###verify relevant results in suggestion list dropdown###");
  let count = 0; // Counter variable

  cy.get(".media-body p.product-name")
    .each(($ele) => {
      let productNameList = $ele.text().trim().toLowerCase();
      if (productNameList.includes(searchKeyword.toLowerCase())) {
        count++; // Increment the counter when the condition is met
        expect(productNameList).to.include(searchKeyword.toLowerCase());
      } else {
        // First 10 search results do not have searchKeyword
        cy.log($ele.text() + " does NOT have " + searchKeyword);
      }
    })
    .then(() => {
      cy.log(`Number of elements with ${searchKeyword}: ${count}`);
      //check atleast 1 results found then pass testcase
      cy.wrap(count).should("be.gte", 1);
    });
});

Cypress.Commands.add("verifySearchResultsSuggestionListSKUHasKey", (searchKeyword) => {
  cy.step("###verify relevant results in suggestion list dropdown###");
  let count = 0; // Counter variable

  cy.get(".media-body p.item-dic")
    .each(($ele) => {
      let productNameList = $ele.text().trim().toLowerCase();
      if (productNameList.includes(searchKeyword.toLowerCase())) {
        count++; // Increment the counter when the condition is met
        expect(productNameList).to.include(searchKeyword.toLowerCase());
      } else {
        // First 10 search results do not have searchKeyword
        cy.log($ele.text() + " does NOT have " + searchKeyword);
      }
    })
    .then(() => {
      cy.log(`Number of elements with ${searchKeyword}: ${count}`);
      //check atleast 1 results found then pass testcase
      cy.wrap(count).should("be.gte", 1);
    });
});

//use this method if u r sure relevant results will be within first 10 results
//only check specific item display in search results as given
Cypress.Commands.add("verifySearchResultsContainItemName", (searchKeyword) => {
  cy.step("###verify relevant item is in suggetion list###");
  cy.get(".product-name")
    .find(`[title='${searchKeyword}']`)
    .should("be.visible");
});

//verify Search Results Has search Key
Cypress.Commands.add("verifySearchResultsBrandHasKey", (searchBrand) => {
  cy.step("###verify relevant results in suggetion list###");
  let count = 0; // Counter variable
  cy.get(".brand-name")
    .each(($ele, index) => {
      if (
        $ele.text().trim().toLowerCase().includes(searchBrand.toLowerCase())
      ) {
        count++; // Increment the counter when the condition is met
        expect($ele.text().trim().toLowerCase()).to.include(
          searchBrand.toLowerCase()
        ); //Assertion for partial text
      } else {
        //first 10 search results does not have searchKeyword
        cy.log($ele.text() + " does not have " + searchBrand);
      }
    })
    .then(() => {
      cy.log(`Number of elements with ${searchBrand}: ${count}`);
      //check atleast 1 results found then pass testcase
      cy.wrap(count).should("be.gte", 1);
    });
});

Cypress.Commands.add("verifyAddToCartPopupSearchResultsSuggestionListHasKey", (searchKeyword) => {
  cy.step("Verify relevant results in suggestion list dropdown in Add To Cart popup");
  let count = 0; // Counter variable

  cy.get(".media-body p.product-name")
    .each(($ele) => {
      let productNameList = $ele.text().trim().toLowerCase();
      if (productNameList.includes(searchKeyword.toLowerCase())) {
        count++; // Increment the counter when the condition is met
        expect(productNameList).to.include(searchKeyword.toLowerCase());
      } else {
        // First 10 search results do not have searchKeyword
        cy.log($ele.text() + " does NOT have " + searchKeyword);
      }
    })
    .then(() => {
      cy.log(`Number of elements with ${searchKeyword}: ${count}`);
      //check atleast 1 results found then pass testcase
      cy.wrap(count).should("be.gte", 1);
    });
    cy.wait(1000)
    cy.clickCloseBtnOnCartPopup();

});

Cypress.Commands.add("verifySearchResultsSKUHasText", (searchKeyword) => {
  cy.step("###verify relevant results in search results page###");
  let count = 0; // Counter variable

  cy.get(".variations-count")
    .each(($ele) => {
      let skuList = $ele.text().trim().toLowerCase();
      if (skuList.includes(searchKeyword.toLowerCase())) {
        count++; // Increment the counter when the condition is met
        expect(skuList).to.include(searchKeyword.toLowerCase());
      } else {
        // First 10 search results do not have searchKeyword
        cy.log($ele.text() + " does NOT have " + searchKeyword);
      }
    })
    .then(() => {
      cy.log(`Number of elements with ${searchKeyword}: ${count}`);
      //check atleast 1 results found then pass testcase
      cy.wrap(count).should("be.gte", 1);
    });
});

//verify Search Results when user click brand from search suggestions list
Cypress.Commands.add("verifyBrandNativeSearchResultsPage", (searchBrand) => {
  cy.get(".brand-name").each(($ele, index) => {
    expect($ele.text().trim().toLowerCase()).to.include(
      searchBrand.toLowerCase()
    );
  });
});

//print search results product list-first 10 on page
Cypress.Commands.add("getSearchResultsProductNames", (searchKeyword) => {
  cy.step("first 10 search results in suggetion list");
  cy.get(".product-name").each(($ele, index) => {
    cy.log($ele.text());
  });
});

//verify SugestionList Has search Key Comparison
Cypress.Commands.add("compareTwoSugestionListResultsAreEqual", (search1, search2) => {
  cy.step('compare Two Search Keys in SugestionList Are Equal')
  const firstList = [];
  const secondList = [];
  let firstsearchCount;
  let secondsearchCount;

  //first search
  cy.enterTextInSearchBar(search1);
  cy.get(".media-body p.product-name").each(($li) => {
    firstList.push($li.text());
  });

  //second search
  cy.enterTextInSearchBar(search2);

  cy.step("check first 10 products from second list equal to first list");
  cy.get(".media-body p.product-name")
    .each(($li) => {
      secondList.push($li.text());
    })
    .then(() => {
      // when this callback runs, both lists will be populated
      expect(firstList).to.include.members(secondList);
    });
});

//verify Search Results Has search Key
Cypress.Commands.add("compareTwoSearchResultsAreEqual", (search1, search2) => {
  cy.step('compare Two Search Results Are Equal')
  const firstList = [];
  const secondList = [];
  let firstsearchCount;
  let secondsearchCount;

  //first search
  cy.searchFromSearchBar(search1);
  cy.getSearchResultsProductNames();
  cy.getCount().then((count) => {
    firstsearchCount = count;
    cy.log("firstsearchCount: " + firstsearchCount);
  });

  cy.get(".product-name").each(($li) => {
    firstList.push($li.text());
  });

  //second search
  cy.searchFromSearchBar(search2);
  cy.getSearchResultsProductNames();

  cy.getCount().then((count) => {
    secondsearchCount = count;
    cy.log("secondsearchCount: " + secondsearchCount);
    expect(secondsearchCount).to.equal(firstsearchCount);
  });

  cy.step("check first 10 products from second list equal to first list");
  cy.get(".product-name")
    .each(($li) => {
      secondList.push($li.text());
    })
    .then(() => {
      // when this callback runs, both lists will be populated
      expect(firstList).to.include.members(secondList);
    });
});

//add to cart search compare 2 reuslts
Cypress.Commands.add("compareTwoSearchResultsAreEqualAddToCartSearch", (skuNumber,productName,search1, search2) => {
  cy.step('compare Two Search Results Are Equal')
  const firstList = [];
  const secondList = [];
  let firstsearchCount;
  let secondsearchCount;
  const productpage = new ProductPage()
  productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

  //first search
  cy.searchFromAddtoCartSearchBar(search1);
  cy.getSearchResultsProductNames();
  cy.getCount().then((count) => {
    firstsearchCount = count;
    cy.log("firstsearchCount: " + firstsearchCount);
  });

  cy.get(".product-name").each(($li) => {
    firstList.push($li.text());
  });

  productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

  //second search
  cy.searchFromAddtoCartSearchBar(search2);
  cy.getSearchResultsProductNames();

  cy.step("compare Two Search Results Are Equal");
  cy.getCount().then((count) => {
    secondsearchCount = count;
    cy.log("secondsearchCount: " + secondsearchCount);
    expect(secondsearchCount).to.equal(firstsearchCount);
  });

  cy.step("check first 10 products from second list equal to first list");
  cy.get(".product-name")
    .each(($li) => {
      secondList.push($li.text());
    })
    .then(() => {
      // when this callback runs, both lists will be populated
      expect(firstList).to.include.members(secondList);
    });
});

Cypress.Commands.add("enterTextInAddtoCartSearchBar", (searchText) => {
  cy.enterText(selectors.addToCartSearchBar, searchText);
  cy.wait(1000)
});

//Add to cart search SugestionList Has search Key Comparison
Cypress.Commands.add("compareTwoSugestionListAddToCartSearchResultsAreEqual", (skuNumber,productName,search1, search2) => {
  cy.step('compare Two Search Keys in SugestionList Are Equal')
  const firstList = [];
  const secondList = [];
  const productpage = new ProductPage()
  productpage.performTopSearchAndAddToCartItem(skuNumber,productName)

  //first search
  cy.enterTextAddtoCartSearchBar(search1);
  // cy.clear().enterText(selectors.addToCartSearchBar, search1);
  //cy.get(selectors.addToCartSearchBar).clear().type(searchText)
  cy.get(".media-body p.product-name").each(($li) => {
    firstList.push($li.text());
  });
  cy.clickCloseBtnOnCartPopup();
  productpage.performTopSearchAndAddToCartItem(skuNumber,productName)
  //second search
  cy.enterTextAddtoCartSearchBar(search2);
  
  cy.step("compare Two Search Keys in SugestionList Are Equal");
  cy.step("check first 10 products from second list equal to first list");
  cy.get(".media-body p.product-name")
    .each(($li) => {
      secondList.push($li.text());
    })
    
    .then(() => {
      // when this callback runs, both lists will be populated
      expect(firstList).to.include.members(secondList);
    });
    cy.clickCloseBtnOnCartPopup();
});

//Select any category from suggetion list
Cypress.Commands.add("clickCategorySuggested", (index) => {
  cy.get(".product-name").eq(index).click();
});