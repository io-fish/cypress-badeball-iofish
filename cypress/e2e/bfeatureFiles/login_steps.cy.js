import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login_po from "../page_objects/Login_PO";

const loginPage = new login_po;
let stub;

When("I enter a username {word}", (userName) => {
  loginPage.typeUsername(userName)
  //cy.get("#text").type(userName);
});

When("I enter a password {word}", (password) => {
  //cy.get("#password").type(password);
  loginPage.typePassword(password)
});

When("I click the login button", () => {
  stub = cy.stub();
  cy.on("window:alert", stub);
  loginPage.clickOnLoginBtn();
  //cy.get("#login-button").click();
});

Then("I should see an alert box which contains text {string}", (message) => {
  expect(stub).to.have.been.calledWith(message);
});
