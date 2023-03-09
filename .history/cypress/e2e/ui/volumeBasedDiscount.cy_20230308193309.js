/// <reference types='cypress' />

import { ItemDetailPage, CartPage, Checkout } from "../../pages";
const itemDetailPage = new ItemDetailPage();
const cartPage = new CartPage();
const checkoutPage = new Checkout();

describe("Directory Page", () => {

  beforeEach(() => {
    itemDetailPage.navigateTo();
  });

  it("checkout with 1 item with no discount ", () => {
    itemDetailPage.addToCartButton().click();
    itemDetailPage.openCartIcon().click();
    cartPage.checkoutButton().click();
    cy.checkPage("/checkout/");
    checkoutPage.
  });
});
