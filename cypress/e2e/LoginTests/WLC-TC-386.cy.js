import SignInPage from '../../PageObjects/SignInPage'

describe("Login Tests", () => {
  const signInPage = new SignInPage()
  let invalid_login;
  before(() => {
    cy.fixture(Cypress.env("fixtureFolder") + "/invalidLogin.json").then(
      (data) => {
        invalid_login = data;
      }
    );
  });

  beforeEach(() => {
    cy.visit("/");
    cy.closeAdvertisementPopup()
  });

  it("WLC-TC-386 Verify SignIn", () => {
    cy.step("verify sign in popup");
    cy.verifyLink("Sign In");
    cy.clickonLink("Sign In");
    signInPage.verifyModalDailogBox();
    signInPage.verifyAndClickStaySignedCheckbox();
    cy.clickonLink("Forgot password?");
    cy.clickOnButton("×");
    //cy.clickonLink("Sign In");
    // cy.clickonLink('Register');
    // cy.verifyLabel('h1', "Register Your User Profile");
    cy.clickRegister();

    cy.step("verify invalid login with invaild credentials");
    cy.clickonLink("Sign In");
    cy.setCredentials(invalid_login.username, invalid_login.password);
    signInPage.verifyInvalidUsernameTextValue(invalid_login.username);
    signInPage.verifyInvalidPasswordTextValue(invalid_login.password);
    cy.clickOnButton("SIGN IN");
    signInPage.verifyErrorMessage();
    cy.clickOnButton("×");

    cy.step("verify successful login with valid credentials");
    cy.clickonLink("Sign In");
    //cy.setCredentials('validLogin');
    cy.setCredentials(Cypress.env("username"), Cypress.env("password"));
    signInPage.verifyValidUsernameTextValue(Cypress.env("username"));
    signInPage.verifyValidPasswordTextValue(Cypress.env("password"));
    signInPage.verifyAndClickPasswordEyeIcon();
    cy.clickOnButton("SIGN IN");
    cy.clickOnFirstRadio();
    cy.clickOnRadio();
    cy.clickOnButton("Continue");
    cy.verifySiteLoaded();
  });
});
