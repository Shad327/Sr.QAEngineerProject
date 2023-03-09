export class CartPage {
  checkoutButton() {
    return cy.getByDataAttr("checkout-link");
  }
}
