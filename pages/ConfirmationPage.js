export class ConfirmationPage {
  constructor(page) {
    this.page = page;

    this.confirmationMessage = page.getByText(
      'Thank you for your order!',
      { exact: true }
    );

    this.confirmationContainer = page.locator(
      '[data-test="checkout-complete-container"]'
    );
  }

  async isOrderConfirmed() {
    return this.confirmationMessage.isVisible();
  }
}