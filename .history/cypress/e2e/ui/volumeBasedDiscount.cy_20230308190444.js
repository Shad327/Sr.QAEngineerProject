/// <reference types='cypress' />

import { Page } from "../../pages";
const directoryPage = new DirectoryPage();

describe("Directory Page", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    cy.loginSession();
    directoryPage.navigateTo();
  });

  it("Has a correct Breadcrumb", () => {
    directoryPage.breadcrumb
      .item1()
      .should("exist")
      .and("have.text", "Directory");

    directoryPage.breadcrumb.home().click({ force: true });
    cy.checkPage("/");
  });

  it("Allows sort by name", () => {
    directoryPage.editOrderbySelection().contains("First Name A - Z");
  });

  it("Allows access to Member profile", () => {
    cy.intercept("Post", "/api/directory/members/all").as("getReq");

    cy.wait("@getReq").then((intercept) => {
      cy.wrap(intercept.response.body.members[0].uid).as("memberCode");
    });
    cy.get("@memberCode").then((string) => {
      directoryPage.firstMemberOnList().click({ force: true });
      cy.checkPage("/directory/memberProfile/" + string);
    });
  });
  it("Has list information, load more button", () => {
    cy.intercept("Post", "/api/directory/members/all", {
      fixture: "memberlist.json",
    }).as("allMembers");
    directoryPage.viewInfoTop().contains("Viewing 1 - 10 of ");
    directoryPage.loadMoreButton().click({ force: true });
    cy.wait("@allMembers");
    directoryPage.elevenMemberOnList().should("have.text", "Danielle Wisen");
    directoryPage.viewInfoTop().should("exist").contains("Viewing 1 - 20 of ");
  });
  it("Has 'BackToTop' Button", () => {
    directoryPage.backToTopButton().click({ force: true });
    cy.window().its("scrollY").should("equal", 0);
  });
});
