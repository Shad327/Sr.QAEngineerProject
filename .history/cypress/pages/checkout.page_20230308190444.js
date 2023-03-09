export class CheckoutPage {
  productQuantity() {
    return cy.getByDataAttr("productQuantity");
  }
  addToCartButton() {
    return cy.getByDataAttr("addToCartButton");
  }
}
