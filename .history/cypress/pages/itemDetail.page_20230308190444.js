export class ItemDetailPage {
  navigateTo() {
    cy.visit("/products/food-sensitivity");
  }
  productQuantity() {
    return cy.getByDataAttr("productQuantity");
  }
  addToCartButton() {
    return cy.getByDataAttr("addToCartButton");
  }
  opeCart() {
    return cy.getByDataAttr("open-cart");
  }
}
