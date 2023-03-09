export class CheckoutPage {
  orderSummaryItemPrice() {
    return cy.getByDataAttr("line-item-total");
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
  grandTotalPrice() {
    return cy.getByDataAttr("grand-total");
  }
  promoInput() {
    return cy.getByDataAttr("promo-input");
  }
  promoButton() {
    return cy.getByDataAttr("promo-button");
  }
}
