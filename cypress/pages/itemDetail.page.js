export class ItemDetailPage {
  navigateTo() {
    cy.visit("/products/food-sensitivity");
  }
  productQuantitySelection() {
    return cy.getByDataAttr("productQuantity");
  }
  addToCartButton() {
    return cy.getByDataAttr("addToCartButton");
  }
  openCartIcon() {
    return cy.getByDataAttr("open-cart");
  }
}
