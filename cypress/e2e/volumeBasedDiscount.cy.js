/// <reference types='cypress' />

import { ItemDetailPage, CartPage, Checkout } from "../../pages";
const itemDetailPage = new ItemDetailPage();
const cartPage = new CartPage();
const checkoutPage = new Checkout();

describe("Directory Page", () => {
  beforeEach(() => {
    itemDetailPage.navigateTo();
  });

  it("checkout with 1 item ", () => {
    itemDetailPage.addToCartButton().click();
    itemDetailPage.openCartIcon().click();
    itemDetailPage
      .productQuantitySelection()
      .select("")
      .should("have.value", "1");
    cartPage.checkoutButton().click();
    cy.checkPage("/checkout/");
    checkoutPage.orderSummaryItemPrice().should("have.text", "$199.00");
    // Subtotal price = total items price
    checkoutPage.subTotal().should("have.text", "$199.00");
    checkoutPage.grandTotalPrice().should("have.text", "$199.00");
    checkoutPage.volumeBasedDiscount().should("not.exsit");

    checkoutPage.filloutInfo(); //not created

    checkoutPage.placeOrderButton().click();

    //Varify the order has been successfully ordered"
    cy.contains("Order successed!!");
  });

  it("checkout with 4 items", () => {
    itemDetailPage.addToCartButton().click();
    itemDetailPage.openCartIcon().click();
    //For demo purpose, ordered same 4 same items, recommanded select muliple item
    itemDetailPage
      .productQuantitySelection()
      .select("4")
      .should("have.value", "4");
    cartPage.checkoutButton().click();
    cy.checkPage("/checkout/");
    checkoutPage.orderSummaryItemPrice().should("have.text", "$199.00");
    // Subtotal price = total items price
    checkoutPage.subTotal().should("have.text", "$796.00"); //796 come from unit price 199 times quantities 4
    checkoutPage.volumeBasedDiscount().should("not.exsit");
    checkoutPage.grandTotalPrice().should("have.text", "$796.00");

    checkoutPage.filloutInfo(); //not created, in real case would create a fill from function which auto fill with Test account data.
    checkoutPage.placeOrderButton().click();
    //Varify the order has been successfully ordered"
    cy.contains("Order successed!!");
  });
  it("checkout with 5 items with volome-based discount", () => {
    itemDetailPage.addToCartButton().click();
    itemDetailPage.openCartIcon().click();

    itemDetailPage
      .productQuantitySelection()
      .select("5")
      .should("have.value", "5");
    cartPage.checkoutButton().click();
    cy.checkPage("/checkout/");
    checkoutPage.orderSummaryItemPrice().should("have.text", "$199.00");

    //Let's say volumeBaseDiscount is 10 percent discount
    checkoutPage.volumeBasedDiscount().should("have.text", "$99.50");
    // Subtotal price = total items price - discount price
    checkoutPage.subTotal().should("not.have.text", "$995.00");
    checkoutPage.grandTotalPrice().should("have.text", "$895.00"); //895=995*0.9

    checkoutPage.filloutInfo(); //not created
    checkoutPage.placeOrderButton().click();
    //Varify the order has been successfully ordered"
    cy.contains("Order successed!!");
  });
  it("checkout with 14 items and volome-based discount and PromoCode discount ", () => {
    itemDetailPage.addToCartButton().click();
    itemDetailPage.openCartIcon().click();

    itemDetailPage
      .productQuantitySelection()
      .select("14")
      .should("have.value", "9");
    cartPage.checkoutButton().click();
    cy.checkPage("/checkout/");
    checkoutPage.orderSummaryItemPrice().should("have.text", "$199.00");
    checkoutPage.volumeBasedDiscount().should("have.text", "$278.60");
    // Subtotal price = total items price - discount price
    checkoutPage.subTotal().should("have.text", "$2507.40");
    checkoutPage.grandTotalPrice().should("have.text", "$$2507.40");

    checkoutPage.promoInput().type("KJdf89689&6Lh");
    checkoutPage.promoButton().click();

    // Now Subtotal price = total items price - discount price - promo code 15$ discount
    checkoutPage.subTotal().should("have.text", "$2492.40");
    checkoutPage.grandTotalPrice().should("have.text", "$2492.40");

    checkoutPage.filloutInfo(); //not created
    checkoutPage.placeOrderButton().click();
    //Varify the order has been successfully ordered"
    cy.contains("Order successed!!");
  });
  //Backend API Validations, Scenario 1
  it("should retrieve items and assert subtotal price is correct", () => {
    cy.request({
      method: "GET",
      url: "https://everlywell.com/v9/shoppingCart",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer eyJ0eXAAAAA1234567890",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const items = response.body.items;
      const subtotal = response.body.subTotal;

      // Assert the subtotal price is correct based on the items in the shopping cart
      expect(subtotal).to.eq(
        items[0].price + items[1].price - response.body.discount
      );
    });
  });
  //Backend API Validations, Scenario 2
  it("should not apply a 100% discount via the /promoCode endpoint", () => {
    // Retrieve the original shopping cart contents
    let originalShoppingCart = {};
    cy.request({
      method: "GET",
      url: "https://everlywell.com/v9/shoppingCart",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer eyJ0eXAAAAA1234567890",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      originalShoppingCart = response.body;
    });

    // Attempt to apply a 100% discount
    cy.request({
      method: "POST",
      url: "https://everlywell.com/v9/promoCode",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer eyJ0eXAAAAA1234567890",
      },
      body: {
        code: "MALICIOUS_CODE",
        percentDiscount: 100,
      },
    }).then((response) => {
      // Assert that the proper status code is returned
      expect(response.status).to.eq(400);

      // Retrieve the shopping cart contents again
      cy.request({
        method: "GET",
        url: "https://everlywell.com/v9/shoppingCart",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer eyJ0eXAAAAA1234567890",
        },
      }).then((response) => {
        // Assert that the contents of the shopping cart have not been affected
        expect(response.body).to.deep.equal(originalShoppingCart);
      });
    });
  });
});
