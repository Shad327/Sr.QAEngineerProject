export class CartPage {
  productQuantity() {
    return cy.getByDataAttr("productQuantity");
  }
  addToCartButton() {
    return cy.getByDataAttr("addToCartButton");
  }
}
