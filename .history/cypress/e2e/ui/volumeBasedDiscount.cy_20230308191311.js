/// <reference types='cypress' />

import { ItemDetailPage } from "../../pages";
const itemDetailPage = new ItemDetailPage();

describe("Directory Page", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    itemDetailPage.navigateTo();
  });

  it("checkout with 1 item with no discount ", () => {
    itemDetailPage;

    directoryPage.breadcrumb.home().click({ force: true });
    cy.checkPage("/");
  });
});
