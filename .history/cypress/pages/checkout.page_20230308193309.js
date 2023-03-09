export class CheckoutPage {
  cartItemPrice() {
    return cy.getByDataAttr("cart-item-price");
  }
  subTotal() {
    return cy.getByDataAttr("sub-total");
  }
  volumeBasedDiscount() {
    return cy.getByDataAttr("VB-dicount");
  }
  placeOrderButton() {
    return cy.getByDataAttr("place-order-button");
  }
}
